import { Router, Request, Response } from "express";
import { UserModel } from "../models/user.model";

const userApi = Router();

userApi.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const result = await UserModel.createOne(body);
  return res.status(200).json({ data: result });
});

userApi.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserModel.getOne(id as string);
  return res.status(200).json({ data: result });
});

userApi.get("/", async (req: Request, res: Response) => {
    const result = await UserModel.getMany();
    return res.status(200).json({ data: result });
  });

export default userApi;
