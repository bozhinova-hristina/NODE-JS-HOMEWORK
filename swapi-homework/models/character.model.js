import { DataService } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";

const charactersPath = pathBuilder(["..", "data", "characters.json"]);

export class CharacterModel {
  static async saveCharacters(characters) {
    await DataService.saveJSONFile(charactersPath, characters);
  }
  // 1.Get all characters
  static async getAllCharacters() {
    const characters = await DataService.readJSONFile(charactersPath);

    return characters;
  }

  //2. Get character by id

  static async getCharacterById(characterId) {
    const characters = await this.getAllCharacters();

    const foundCharacter = characters.find(
      (character) => String(character.id) === characterId
    );
    // console.log(foundCharacter)
    if (!foundCharacter) {
      console.error(`Character with id ${characterId} not found`);
      throw new Error("Character not found");
    }

    return foundCharacter;
  }

  // 3.Create new character

  static async createCharacter(characterData) {
    const characters = await this.getAllCharacters();
    const emailExists = characters.some(
      (character) => character.email === characterData.email
    );
    if (!emailExists) throw new Error("Email already exist!");
    const newCharacter = {
      id: uuid(),
      ...characterData,
    };

    const updatedCharacters = [...characters, newCharacter];
    await this.saveCharacters(updatedCharacters);
    return newCharacter;
  }

  // 4. Update Character
  static async updateCharacter(characterId, updateData) {
    const characters = await this.getAllCharacters();
    console.log(characters);

    const foundCharacter = await this.getCharacterById(characterId);
    console.log(foundCharacter);

    if (updateData.id) throw new Error("Invalid updates");
    const updatedCharacter = { ...foundCharacter, ...updateData };
    console.log(updatedCharacter);

    const updatedCharacters = characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );
    await this.saveCharacters(updatedCharacters);
    return updatedCharacter;
  }

  // 5.Delete all characters
  static async deleteAllCharacters() {
    await this.saveCharacters([]);
  }
  // 6.Delete character by id
  static async deleteCharacter(characterId) {
    const characters = await this.getAllCharacters();

    const updatedCharacters = characters.filter(
      (character) => String(character.id) !== characterId
    );

    if (updatedCharacters.length === characters.length)
      throw new Error("Character not found");
    await this.saveCharacters(updatedCharacters);
  }
}
