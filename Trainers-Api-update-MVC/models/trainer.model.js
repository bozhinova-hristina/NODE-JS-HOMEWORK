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
 static async getAllTrainers(filters)  {
  let trainers = await DataService.readJSONFile(trainersPath);
  // console.log(trainers) 
    if(filters?.isCurrentlyTeaching){
   trainers = trainers.filter(trainer => {
     if(filters.isCurrentlyTeaching === 'true') return trainer.isCurrentlyTeaching;
    if(filters.isCurrentlyTeaching === 'false') return !trainer.isCurrentlyTeaching;
     console.log(trainers)
   });

   if(filters?.coursesFinished){
    trainers.sort((trainer1, trainer2) => {
   if(filters.coursesFinished === 'asc') return trainer1.coursesFinished - trainer2.coursesFinished;
   if(filters.coursesFinished === 'decs') return trainer2.coursesFinished - trainer1.coursesFinished;
  
  
    });

  }

  return trainers;
 }
}
 //2. Get trainer by id

 static async getTrainerByID(trainerId){
  const trainers = await this.getAllTrainers();

  const foundTrainer = trainers.find(trainer => trainer.id === trainerId);
  if(!foundTrainer) throw new Error ("Trainer not available");

  // console.log(foundTrainer);
  return foundTrainer;
 }

// 3.Add a trainer.
static async  addTrainer(firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished){


const trainers = await this.getAllTrainers();


const emailExist =  trainers.some(trainer => trainer.email === trainerData.email);


if(emailExist) throw new Error ('Email already exist');

const trainerData = { firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished };


 const newTrainer = {
   id: uuid(),
 ...trainerData
 }

 const updatedTrainers = [...trainers, newTrainer];
 await this.saveTrainers(updatedTrainers);

 return newTrainer;
}
// 4.Update Trainer Info.

static async updateTrainer (trainerId, updateData) {

 const trainers = await this.getAllTrainers();
 const foundTrainer = await this.getTrainerByID(trainerId);

 if(updateData.id) throw new Error ("Invalid update");

 const updatedTrainer = {
  ...foundTrainer,
  ...updateData,
 };

const updatedTrainers = trainers.map(trainer => 
 trainer.id === updatedTrainer.id ? foundTrainer : trainer);

 await this.saveTrainers(updatedTrainers)
 return updatedTrainers;
}


//5.Delete all trainers
static async deleteAllTrainers(){
 await this.saveTrainers([]);
}


//6. Delete trainer by id
static async deleteTrainer(trainerId){

 const trainers = this.getAllTrainers();
 const updatedTrainers = trainers.filter(trainer => trainer.id !== trainerId)
 
 if(updatedTrainers.length === trainers.length) throw new Error ("Trainer not found");
 await this.saveTrainers(updatedTrainers)
 }


}

