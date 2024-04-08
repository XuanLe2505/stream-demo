import { roomHandler } from './../room/index';
import { Server, Socket } from 'socket.io';

export const BootstrapSocketIo = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log('connected::::', socket.id);
    roomHandler(socket);
    socket.on("disconnect", () => {
    });
  });
};
