import express from "express";
import cors from "cors";
import { BootstrapSocketIo } from "./socket";
import { BoostrapRouter } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

BoostrapRouter(app);


const server = app.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
BootstrapSocketIo(server);

