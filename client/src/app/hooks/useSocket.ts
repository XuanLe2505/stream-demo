import { useContext } from "react"
import { SocketContext, SocketContextType } from "../context/Socket"

const useSocket = () => {
    return useContext(SocketContext) as SocketContextType;
}

export default useSocket;