"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "next/navigation";
import { peerStateType } from "../reducers/peerReducer";
import MicrophoneIcon from "../common/MicrophoneIcon";
import VideoCamera from "../common/VideoCamera";
import VideoCameraSlash from "../common/VideoCameraSlash";
import useSocket from "../hooks/useSocket";

export default function RoomDetail() {
    const params = useParams();
    const { socket } = useSocket();
    const { stream, setStream, peers, myPeer } = useContext(RoomContext);
    const [isCamera, setIsCamera] = useState<boolean>(true);

    const toggleCamera = async () => {
        if(stream) {
            if(isCamera) {
                stream.getVideoTracks()[0].stop();
            } else {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setStream!(newStream);
            }
        }
        setIsCamera(!isCamera);
    };

    useEffect(() => {
        if(myPeer) {
            socket?.emit("join-room", { roomId: params?.meetingId, peerId: myPeer.id });
        }
    }, [stream]);

    return (
        <main className="relative min-h-screen w-full p-5">
            <h1 className=" font-bold text-[20px]">room meeting id: {params.meetingId}</h1>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <VideoPlayer stream={stream} isCamera={isCamera} />
                {Object.values(peers).length > 0 &&
                    Object.values(peers as peerStateType).map((peer) => <VideoPlayer stream={peer.stream} key={peer.peerId} />)}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-4 py-5">
                <div className="relative cursor-pointer w-12 h-12 border border-black rounded-full">
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                        <MicrophoneIcon/>
                    </div>
                </div>
                <div className="relative cursor-pointer w-12 h-12 border border-black rounded-full" onClick={toggleCamera}>
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                        <VideoCamera/>
                    </div>
                </div>
                <div className="relative cursor-pointer w-12 h-12 border border-black rounded-full">
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                        <VideoCameraSlash/>
                    </div>
                </div>
            </div>
        </main>
    );
}
