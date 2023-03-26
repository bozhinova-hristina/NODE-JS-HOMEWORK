import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/joi-validation-middleware.js";

export const authRouter = Router();

//1.Register user
authRouter.post("/register", validateUser, AuthController.registerUser);

//2.Login user

// 3. Refresh access token (get and post are both viable over here)

// 4. Logout user (get and post are both viable over here)
