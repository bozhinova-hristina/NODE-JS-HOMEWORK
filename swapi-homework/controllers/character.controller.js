import { CharacterModel } from "../models/character.model.js";

export class CharacterController {
  // 1.Get all characters

  static async getAllCharacters(req, res) {
    try {
      const characters = await CharacterModel.getAllCharacters();
      // console.log(characters);
      return res.json(characters);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  //   2. Get character by id

  static async getCharacterById(req, res) {
    try {
      const characterId = req.params.id;
      console.log(characterId);
      const foundCharacter = await CharacterModel.getCharacterById(characterId);
      // console.log(foundCharacter);
      return res.json(foundCharacter);
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ error: `Character not found: ${error.message}` });
    }
  }
  //   3. Create new character
  static async createCharacter(req, res) {
    try {
      const characterData = req.body;

      const newCharacter = await CharacterModel.createCharacter(characterData);

      return res.status(201).json(newCharacter);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 4.Update character
  static async updateCharacter(req, res) {
    try {
      const { id: characterId } = req.params;
      const updateData = req.body;
      const updatedCharacter = await CharacterModel.updateCharacter(
        characterId,
        updateData
      );

      return res.json(updatedCharacter);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 5.Delete all characters
  static async deleteAllCharacters(req, res) {
    try {
      await CharacterModel.deleteAllCharacters();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // 6.Delete character by id
  static async deleteCharacter(req, res) {
    try {
      const { id: characterId } = req.params;

      await CharacterModel.deleteCharacter(characterId);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
}
