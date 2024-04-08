import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

interface IUser {
  peerId: string;
  userName: string;
}

interface IRoomParams {
  roomId: string;
  peerId: string;
}

interface IJoinRoomParams extends IRoomParams {
  userName: string;
}

let rooms: Record<string, Record<string, IUser>> = {};

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ peerId, roomId }: IJoinRoomParams) => {
    console.log({ roomId });
    if (!rooms[roomId]) {
      rooms[roomId] = {};
    }
    rooms[roomId][peerId] = { peerId, userName: "" };
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", { peerId, userName: "" });
  };

  socket.on("join-room", joinRoom);
};
