import { Router } from "express";
import { CharacterController } from "../controllers/character.controller.js";
import {
  characterValidatorOptional,
  characterValidator,
} from "../middlewares/joi-validation-middleware.js";

export const characterRouter = Router();

// 1.Get all characters
characterRouter.get("/", CharacterController.getAllCharacters);

// 2.Get character by id
characterRouter.get("/:id", CharacterController.getCharacterById);

// 3.Create character
characterRouter.post(
  "/",
  characterValidator,
  CharacterController.createCharacter
);

// 4.Update character
characterRouter.patch(
  "/:id",
  characterValidatorOptional,
  CharacterController.updateCharacter
);

//5.Delete all characters
characterRouter.delete("/all", CharacterController.deleteAllCharacters);

// 6.Delete character
characterRouter.delete("/:id", CharacterController.deleteCharacter);
