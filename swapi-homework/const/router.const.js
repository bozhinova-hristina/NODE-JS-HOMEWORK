import { Router } from "express";
import { authRouter } from "../routes/auth.routes.js";
import { characterRouter } from "../routes/character.routes.js";

export const globalRouter = Router();

globalRouter.use("/", authRouter);
globalRouter.use("/characters", characterRouter);
