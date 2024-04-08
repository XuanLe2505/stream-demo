import { Application, Router } from "express";
import userApi from "./user.api";

export const BoostrapRouter = (app: Application) => {
  const router = Router();

  router.use("/users", userApi);
//   router.use("/room", roomApi);

  app.use("/api/", router);
};
