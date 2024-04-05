'use client'
import { v4 as uuidv4 } from 'uuid';
import useSocket from "./hooks/useSocket";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

export default function Home() {
  const { socket } = useSocket();
  const { userName, setUserName } = useContext(UserContext);
  const createRoom = () => {
    if(socket) {
      socket.emit('create-room');
    }
  }
  return (
    <main className="min-h-screen p-24">
      <div className='w-[350px]'>
        <input 
          type="text" 
          className='border rounded-md p-2 h-10 my-2 w-full'
          placeholder='Enter your name'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <button onClick={createRoom} className="px-4 py-2 bg-blue-500 text-white rounded-md">New meeting</button>
    </main>
  );
}
