import { Router } from "express";
import { CharacterController } from "../controllers/character.controller.js";

export const characterRouter = Router();

// 1.Get all characters
characterRouter.get("/", CharacterController.getAllCharacters);

// 2.Get character by id
characterRouter.get("/:id", CharacterController.getCharacterById);

// 3.Create character
characterRouter.post("/", CharacterController.createCharacter);

// 4.Update character
characterRouter.patch("/:id", CharacterController.updateCharacter);

//5.Delete all characters
characterRouter.delete("/all", CharacterController.deleteAllCharacters);

// 6.Delete character
characterRouter.delete("/:id", CharacterController.deleteCharacter);
