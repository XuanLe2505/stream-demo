import { Socket } from "socket.io";
import { v4 as uuidV4 } from 'uuid';

interface IUser {
    peerId: string;
    userName: string;
};

interface IRoomParams {
    roomId: string;
    peerId: string;
};

interface IJoinRoomParams extends IRoomParams {
    userName: string;
};

const rooms: Record<string, Record<string, IUser>> = {};

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidV4();
        rooms[roomId] = {};
        socket.emit('room-created', { roomId });
    };

    const joinRoom = ({ roomId, peerId, userName }: IJoinRoomParams) => {
        // if(!rooms[roomId]) rooms[roomId] = {};
        console.log('user joined the room', roomId);
        socket.join(roomId);
        // rooms[roomId][peerId] = { peerId, userName };
        
    };

    socket.on('create-room', createRoom);
    socket.on('join-room', joinRoom);
};