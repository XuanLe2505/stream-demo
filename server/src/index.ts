import express from "express";
import cors from "cors";
import { BootstrapSocketIo } from "./socket";
import { BootstrapRouter } from "./routes";
import BootstrapPeer from "./peer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

BootstrapRouter(app);


const server = app.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
BootstrapSocketIo(server);

BootstrapPeer();

