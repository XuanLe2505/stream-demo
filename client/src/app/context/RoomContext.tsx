"use client";
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import useSocket from "../hooks/useSocket";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { peersReducer } from "../reducers/peerReducer";

interface IRoom {
  roomId: string;
  stream?: MediaStream;
  listRemoteStream: MediaStream[];
}

export const RoomContext = createContext<IRoom>({
  roomId: "",
  listRemoteStream: []
});

export const RoomContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket();
  const [stream, setStream] = useState<MediaStream>();
  const [listRemoteStream, setListRemoteStream] = useState<MediaStream[]>([]);
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
      const p = new PeerJs(userId, {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });
      setMyPeer(p);
    })();
  }, []);

  useEffect(() => {
    if (!myPeer) return;
    socket?.emit("join-room", { roomId: params?.meetingId, peerId: myPeer.id });
    socket?.on("user-joined", ({ peerId, userName }) => {
      const call = myPeer.call(peerId, stream!);
      call.on("stream", (peerStream) =>
        setListRemoteStream((preListStream) => {
          const preListStreamTemp = { ...preListStream };
          if (peerId === myPeer.id) return preListStreamTemp;
          return { ...preListStream, [peerId]: peerStream };
        })
      );
    });
    myPeer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) =>
      setListRemoteStream((preListStream) => {
          const preListStreamTemp = { ...preListStream };
          if (call.peer === myPeer.id) return preListStreamTemp;
          return { ...preListStream, [call.peer]: peerStream };
        })
      );
    });
  }, [myPeer]);

  return (
    <RoomContext.Provider
      value={{
        roomId,
        stream,
        listRemoteStream
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
