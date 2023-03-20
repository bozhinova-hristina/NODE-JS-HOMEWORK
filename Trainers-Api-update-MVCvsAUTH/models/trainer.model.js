import { DataService } from "../services/data.services.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";
import bcrypt from "bcryptjs";

const trainerSchema = Joi.object({
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  isCurrentlyTeaching: Joi.boolean().required(),
  timeEmployed: Joi.string().required(),
  coursesFinished: Joi.number().required(),
});

class Trainer {
  constructor(
    firstName,
    lastName,
    email,
    password,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished
  ) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isCurrentlyTeaching = isCurrentlyTeaching;
    this.timeEmployed = timeEmployed;
    this.coursesFinished = coursesFinished;
  }
}

const trainersPath = pathBuilder(["..", "data", "trainers.json"]);

export class TrainerModel {
  //Save trainers
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(trainersPath, trainers);
  }
  // 1. Get all trainers
  static async getAllTrainers(filters) {
    let trainers = await DataService.readJSONFile(trainersPath);
    // console.log(trainers)
    if (filters?.isCurrentlyTeaching) {
      trainers = trainers.filter((trainer) => {
        if (filters.isCurrentlyTeaching === "true")
          return trainer.isCurrentlyTeaching;
        if (filters.isCurrentlyTeaching === "false")
          return !trainer.isCurrentlyTeaching;
        console.log(trainers);
      });

      if (filters?.coursesFinished) {
        trainers.sort((trainer1, trainer2) => {
          if (filters.coursesFinished === "asc")
            return trainer1.coursesFinished - trainer2.coursesFinished;
          if (filters.coursesFinished === "decs")
            return trainer2.coursesFinished - trainer1.coursesFinished;
        });
      }

      return trainers;
    }
  }
  //2. Get trainer by id

  static async getTrainerByID(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);
    if (!foundTrainer) throw new Error("Trainer not available");

    // console.log(foundTrainer);
    return foundTrainer;
  }

  // 3.Add a trainer.
  static async addTrainer(
    firstName,
    lastName,
    email,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished
  ) {
    const trainers = await this.getAllTrainers();

    const emailExist = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExist) throw new Error("Email already exist");

    const trainerData = {
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished,
    };

    const newTrainer = {
      id: uuid(),
      ...trainerData,
    };

    const updatedTrainers = [...trainers, newTrainer];
    await this.saveTrainers(updatedTrainers);

    return newTrainer;
  }
  // 4.Update Trainer Info.

  static async updateTrainer(trainerId, updateData) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = await this.getTrainerByID(trainerId);

    if (updateData.id) throw new Error("Invalid update");

    const updatedTrainer = {
      ...foundTrainer,
      ...updateData,
    };

    const updatedTrainers = trainers.map((trainer) =>
      trainer.id === updatedTrainer.id ? foundTrainer : trainer
    );

    await this.saveTrainers(updatedTrainers);
    return updatedTrainers;
  }

  //5.Delete all trainers
  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

  //6. Delete trainer by id
  static async deleteTrainer(trainerId) {
    const trainers = this.getAllTrainers();
    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (updatedTrainers.length === trainers.length)
      throw new Error("Trainer not found");
    await this.saveTrainers(updatedTrainers);
  }

  // 7.Register trainer
  static async registerTrainer(trainerData) {
    const trainers = await this.getAllTrainers();
    const trainerExist = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (trainerExist) throw new Error("Email already exist");

    const validation = trainerSchema.validate(trainerData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const {
      firstName,
      lastName,
      email,
      password,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished,
    } = trainerData;

    const hashedPassword = await bcrypt.hash(password, 10);
    // It is generally recommended to use a higher number of rounds, such as 10-14, in order to provide stronger password hashing security.

    const newTrainer = new Trainer(...trainerData, hashedPassword);
    const updatedTrainers = [...trainers, newTrainer];

    await this.saveTrainers(updatedTrainers);

    const { password: trainerPassword, ...trainerWithoutPassword } = newTrainer;
    return trainerWithoutPassword;
  }

  // 8.Login trainer
  static async loginTrainer(credentials) {
    const { email, password } = credentials;

    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.email === email);

    if (!foundTrainer) throw new Error("Invalid Credentials");
    const isPasswordValid = await bcrypt.compare(
      password,
      foundTrainer.password
    );

    if (!isPasswordValid) throw new Error("Invalid Credentials");
    const { password: trainerPassword, ...trainerWithoutPassword } =
      foundTrainer;
    return trainerWithoutPassword;
  }
}
