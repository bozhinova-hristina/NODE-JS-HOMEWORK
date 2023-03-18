import { TrainerModel } from "../models/trainer.model.js";

export class TrainerController {
 // 1. Get all trainers
 static async getAllTrainers(req, res) {
  try {
   const trainers = await TrainerModel.getAllTrainers();
 
   return res.json(trainers);

  } catch (error) {
   console.log(error);
   return res.status(500).json({ msg: error.message });
  }
 }
  //   2. Get trainer by id
  static async getTrainerByID(req, res) {
   try {
    const { id: trainerId } = req.params;
    const foundTrainer = await TrainerModel.getTrainerByID(trainerId);
    return res.json(foundTrainer)

   } catch (error) {
    console.log(error)
    return res.status(404).json( {msg: error.message })
    
   }
  }







}