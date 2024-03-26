const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket: any) => {
    io.emit("send", { name: "Xuan" });
    console.log('a user connected');
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});