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
import { MediaConnection } from "peerjs";

export default function RoomDetail() {
    const params = useParams();
    const { socket } = useSocket();
    const { stream, setStream, peers, myPeer } = useContext(RoomContext);
    const [isCamera, setIsCamera] = useState<boolean>(true);

    const replaceTrack = (peer: MediaConnection, track: MediaStreamTrack) => {
        if(myPeer) {
            const sender = peer.peerConnection.getSenders().find(sender => sender.track?.kind === track.kind);
            sender?.replaceTrack(track);
        }
    };

    const toggleCamera = async () => {
        if(stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if(isCamera) {
                videoTrack.enabled = false;
                videoTrack.stop(); //turn off web cam light indicator
            } else {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                const newVideoTrack = newStream.getVideoTracks()[0];
                stream.removeTrack(videoTrack);
                stream.addTrack(newVideoTrack);
                Object.values(peers as peerStateType).forEach(peer => replaceTrack(peer.peer, newVideoTrack));
            }
        }
        setIsCamera(!isCamera);
    };

    return (
        <main className="relative min-h-screen w-full p-5">
            <h1 className=" font-bold text-[20px]">room meeting id: {params.meetingId}</h1>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <VideoPlayer stream={stream} isCamera={isCamera} />
                {Object.values(peers).length > 0 &&
                    Object.values(peers as peerStateType).map((peer) => <VideoPlayer stream={peer.stream} key={peer.peer.peer} />)}
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
