"use client";
import { v4 as uuidv4 } from "uuid";
import useSocket from "./hooks/useSocket";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Link from "next/link";

export default function Home() {
  const { userName, setUserName } = useContext(UserContext);
  const router = useRouter();
  const directMettingDetail = () => {
    const roomId = uuidv4();
    router.push("/" + roomId);
  };
  return (
    <main className="min-h-screen p-24">
      <div className="w-[350px]">
        <input
          type="text"
          className="border rounded-md p-2 h-10 my-2 w-full"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={directMettingDetail}
      >
        New meeting
      </button>
    </main>
  );
}
