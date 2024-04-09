"use client";
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import useSocket from "../hooks/useSocket";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { peerStateType, peersReducer } from "../reducers/peerReducer";
import { addPeerNameAction, addPeerStreamAction, removePeerStreamAction } from "../reducers/peerActions";
import { UserContext } from "./UserContext";

interface IRoom {
  roomId: string;
  stream?: MediaStream;
  peers: peerStateType;
  setStream?: (stream: MediaStream) => void;
  myPeer?: Peer;
}

export const RoomContext = createContext<IRoom>({
  roomId: "",
  peers: {},
});

export const RoomContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket();
  const { userId, userName } = useContext(UserContext);
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [roomId, setRoomId] = useState<string>("");
  const [myPeer, setMyPeer] = useState<Peer>();
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (!socket) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);
      const userId = uuidv4();
      const PeerJs = (await import("peerjs")).default;
      const peer = new PeerJs(userId, {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });
      setMyPeer(peer);
    })();
  }, []);

  useEffect(() => {
    if (!myPeer) return;
    socket?.emit("join-room", { roomId: params?.meetingId, peerId: myPeer.id });
    socket?.on("user-joined", ({ peerId, userName }) => { 
      const call = myPeer.call(peerId, stream!, {
        metadata: {
          userName,
        }
      });      
      call.on("stream", (peerStream) => {
        dispatch(addPeerStreamAction(peerId, peerStream));
      });
      dispatch(addPeerNameAction(peerId, userName));
    });
    myPeer.on("call", (call) => {
      const { userName } = call.metadata as { userName: string };
      dispatch(addPeerNameAction(call.peer, userName));
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerStreamAction(call.peer, peerStream));
      });
    });
    socket?.on('leave-room', (peerId: string) => {
      dispatch(removePeerStreamAction(peerId));
    })
  }, [myPeer]);

  return (
    <RoomContext.Provider
      value={{
        roomId,
        stream,
        peers,
        setStream,
        myPeer,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
