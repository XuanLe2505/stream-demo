'use client'
import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { useRouter } from "next/navigation";

interface IRoom {
    roomId: string;
    stream?:MediaStream;
}

export const RoomContext = createContext<IRoom>({
    roomId: '',
});

export const RoomContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { socket } = useSocket();
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>('');
    // useEffect(() => {
    //     const peer = new Peer();
    // }); 
    const enterRoom = ({ roomId }: { roomId: string }) => {
        router.push(`/${roomId}`);
    };
     useEffect(() => {
        if(socket) {
            socket.on('room-created', enterRoom);
        };
     });

    return (
        <RoomContext.Provider 
            value={{
                roomId,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
}