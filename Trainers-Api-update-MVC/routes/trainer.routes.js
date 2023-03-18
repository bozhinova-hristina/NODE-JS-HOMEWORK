import { Router } from "express";
import { TrainerController } from "../controllers/trainer.controller.js";

export const trainerRouter = Router();

// 1. Get all trainers
trainerRouter.get("/", TrainerController.getAllTrainers);
// 2. Get trainer by id
trainerRouter.get("/:id", TrainerController.getTrainerByID);