"use client";
import { useContext, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { RoomContext } from "../context/RoomContext";
import VideoPlayer from "../components/VideoPlayer";

type MeetingDetailPageType = {
  params: {
    meetingId: string;
  };
};

export default function MeetingDetailPage({ params }: MeetingDetailPageType) {
  const { stream, listRemoteStream } = useContext(RoomContext);

  useEffect(() => {
    console.log(listRemoteStream);
  },[listRemoteStream])
  return (
    <main className="min-h-screen w-full p-5">
      <h1 className=" font-bold text-[20px]">
        room meeting id: {params.meetingId}
      </h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <VideoPlayer stream={stream} />
        {listRemoteStream &&
          Object.values(listRemoteStream).length > 0 &&
          Object.keys(listRemoteStream)
            .map((key: any) => (
              <VideoPlayer
                stream={listRemoteStream[key]}
                key={listRemoteStream[key].id}
              />
            ))}
      </div>
    </main>
  );
}
