import express from 'express';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { roomHandler } from './room';

const app = express();
app.use(cors);
const server = createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: "*",
    methods: ["GET", "POST"], 
  },
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  roomHandler(socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});