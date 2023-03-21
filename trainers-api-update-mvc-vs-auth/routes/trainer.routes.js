import { Router } from "express";
import { TrainerController } from "../controllers/trainer.controller.js";

export const trainerRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
