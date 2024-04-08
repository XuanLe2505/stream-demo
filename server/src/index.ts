import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { BootstrapSocketIo } from "./socket";

const app = express();
const server = createServer(app);
app.use(cors);
BootstrapSocketIo(server);

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
