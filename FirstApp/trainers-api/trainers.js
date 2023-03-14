import path from 'node:path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'node:url';
import { DataService } from "./services/data.services.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const publicPath = path.join(__dirname, "public");

const trainersPath = path.join(__dirname, "data", "trainers.json");

const saveTrainers = async trainers => {
 await DataService.saveJSONFile(trainersPath, trainers);
};




// 1. Get all trainers 
export const getAllTrainers = async () => {
 const trainers = await DataService.readJSONFile(trainersPath);

 // Implement query params filter logic



 return trainers;
};



// 2.Get trainer by id.

export const getTrainerById = async trainerId => {
 const trainers = await getAllTrainers();
 const foundTrainer = trainers.find(trainer => trainer.id === trainerId)

 if (!foundTrainer) throw new Error('Trainer not found');

 return foundTrainer;
}

// 3.Add a trainer.
export const addTrainer = async (firstName, lastName, email, isCurrentlyTeaching, timeEmployed, coursesFinished) => {

 const trainers = await getAllTrainers();

 const trainer = {
  id: uuid(),
  firstName,
  lastName,
  email,
  isCurrentlyTeaching,
  timeEmployed,
  coursesFinished,
 }

 const updatedTrainers = [...trainers, trainer];
 

 await saveTrainers(updatedTrainers);
 return trainer;
}

// 4.Update Trainer Info.

export const updateTrainer = async (trainerId, updateData) => {
 const trainers = await getAllTrainers();
 const foundTrainer = await getTrainerById(trainerId);

 const updatedTrainer = {
  ...foundTrainer,
  ...updateData,
 };



const updatedTrainers = trainers.map(trainer => {
 if(trainer.id === updatedTrainer.id) return updatedTrainer;
 return trainer;
})


  // const updatedTrainers = trainers.map(trainer => {
  //  trainer.id === updatedTrainer.id ? updatedTrainer : trainer;
  //  return trainer;
  // })

  await saveTrainers(updatedTrainers);
  return updatedTrainer;
 }

 // 5. Delete task

 export const deleteTrainer = async trainerId => {

  const trainers = await getAllTrainers();
  const updatedTrainers = trainers.filter(trainer => trainer.id !== trainerId);

 if(updatedTrainers.length === trainers.length) throw new Error('Trainer not found')

 await saveTrainers(updatedTrainers);

 }

 // 6. Delete all trainers

 export const deleteAllTrainers = async () => {
    await saveTrainers([]);
    return { message: "All trainers deleted successfully." };
};

