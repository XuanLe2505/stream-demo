"use client"
import { useEffect } from "react";
import io from 'socket.io-client';
import useMediaStream from "../hooks/useMediaStream";
import useSocket from "../hooks/useSocket";
import VideoPlayer from "../component/VideoPlayer";

type MeetingDetailPageType = {
  params: {
    meetingId: string
  }
}

export default function MeetingDetailPage({ params }: MeetingDetailPageType) {
  const { stream } = useMediaStream();
  const { socket } = useSocket();

  useEffect(() => {
    if(socket) {
      socket.emit('abc');
      socket.on("send", (data: any) => console.log(data));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>{params.meetingId}</div>
        <div className="w-[600px] h-[300px]">
            <VideoPlayer stream={stream}/>
        </div>
    </main>
  );
}
