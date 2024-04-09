"use client";
import RoomDetail from "../components/RoomDetail";
import { RoomContextProvider } from "../context/RoomContext";


export default function MeetingDetailPage() {
  return (
    <RoomContextProvider>
      <RoomDetail/>
    </RoomContextProvider>
  );
}
