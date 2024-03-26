"use client"
import { useEffect } from "react";
import io from 'socket.io-client'
type MeetingDetailPageType = {
  params: {
    meetingId: string
  }
}

export default function MeetingDetailPage({ params }: MeetingDetailPageType) {

  useEffect(() => {
    
    const socket = io('http://localhost:3001');
    socket.on("send", (data: any) => console.log(data));
    

  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>{params.meetingId}</div>
        <div className="w-[600px] h-[300px]">
            <video className="w-full"></video>
        </div>
    </main>
  );
}
