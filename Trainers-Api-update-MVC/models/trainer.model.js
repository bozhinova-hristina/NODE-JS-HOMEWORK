import { DataService } from "../services/data.services.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const trainersPath = path.join(__dirname, "..", "data", "trainers.json");

export class TrainerModel {
 //Save trainers
 static async saveTrainers(trainers){
  await DataService.saveJSONFile(trainersPath, trainers);
 }
 // 1. Get all trainers
 static async getAllTrainers() {
  const trainers = await DataService.readJSONFile(trainersPath);
  return trainers;
 }
 //2. Get trainer by id

 static async getTrainerByID(trainerId){
  const trainers = await this.getAllTrainers();

  const foundTrainer = trainers.find(trainer => trainer.id === trainerId);
  if(!foundTrainer) throw new Error ("Trainer not available");

  return foundTrainer;
 }

 //   3. Create new trainer

static async createTrainer(req, res) {

 try {

  
  
 } catch (error) {
  
 }
}


}