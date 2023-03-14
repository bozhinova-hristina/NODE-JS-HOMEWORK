import { Router } from "express";
import express from "express";
import {
  getAllTrainers,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  deleteAllTrainers,
  publicPath
} from "../trainers.js";
export const trainersRouter = Router();


trainersRouter.use("/home", express.static(publicPath));



// 1. Get all trainers 
trainersRouter.get('/', async (req, res) => {
  try {
    const trainers = await getAllTrainers()
    const { isCurrentlyTeaching, sortBy } = req.query;

    if (isCurrentlyTeaching === 'false') {
      const inactiveTrainers = trainers.filter(trainer => !trainer.isCurrentlyTeaching);
      return res.send(inactiveTrainers)
    }

    else if (isCurrentlyTeaching === 'true') {
      const currentTrainers = trainers.filter(trainer => trainer.isCurrentlyTeaching);
      return res.json(currentTrainers)
    }

    if (sortBy === 'coursesAsc') {
      const descTrainers = trainers.sort((trainerN1, trainerN2) => trainerN2.coursesFinished - trainerN1.coursesFinished);
      return res.json(descTrainers)
    }

    return res.json(trainers)
  } catch (err) {
    // console.log(err)
    return res.status(500).send(err.message);
  }
})


// 2.Get trainer by id.
trainersRouter.get('/:id', async (req, res) => {
  try {
    const trainerId = req.params.id;
    const foundTrainer = await getTrainerById(trainerId);
    //  console.log(foundTrainer)
    res.json(foundTrainer)

  } catch (err) {
    // console.log(err)
    return res.status(404).send(err.message);
  }
})

// 3.Add a trainer.

trainersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed } = req.body;

    if (!firstName || !lastName || !email || !timeEmployed) throw new Error('Invaid trainer data');

    const newTrainer = await addTrainer(firstName, lastName, email, timeEmployed);
    return res.json(newTrainer);

  } catch (error) {
    // console.log(error)
    return res.status(400).send({ message: 'Missing required fields' });
  }
})

// 4.Update Trainer Info.
trainersRouter.patch('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const trainerId = req.params.id;

    if (updateData.id) throw new Error('Invalid update');

    const updatedTrainer = await updateTrainer(trainerId, updateData);
    return res.status(200).send(updatedTrainer)

  } catch (error) {
    return res.status(400).send(error.message);
  }
});



// 6.Delete all trainers.

trainersRouter.delete("/all", async (req, res) => {
  try {
    await deleteAllTrainers();
    return res.sendStatus(200)

  } catch (error) {
    return res.sendStatus(500);
  }
});


// 5.Delete trainer.

trainersRouter.delete('/:id', async (req, res) => {
  try {
    const trainerId = req.params.id;
    await deleteTrainer(trainerId);
    res.sendStatus(204)

  } catch (error) {
    return res.status(404).send(error.message)
  }
})





// CRUD

// C - Create - POST
// R - Read - GET
// U - Update - PUT - celiot task da bide vraten, i da bide smeneto samo toa sto e smeneto
//            - PATCH -  samo prakjam raboti sto sakam da gi update-tiram
// D - Delete - DELETE




