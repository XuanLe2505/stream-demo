"use client"
import { createContext, useState } from "react";
import { Socket, io } from "socket.io-client"

export type SocketContextType = {
    socket: Socket | null;
    setSocket: Function;
}

type SocketProviderProps = {
    children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider: React.FC<SocketProviderProps> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    if(!socket) {
        const newSocket: Socket = io('http://localhost:3001');
        newSocket.connect();
        setSocket(newSocket);
    }
    
    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>     
    )
}

