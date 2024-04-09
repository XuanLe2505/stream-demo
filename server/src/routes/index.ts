import { Application, Router } from "express";
import userRouter from "./user.api";

export const BootstrapRouter = (app: Application) => {
  const router = Router();

  router.use("/users", userRouter);
//   router.use("/room", roomApi);

  app.use("/api/", router);
};
