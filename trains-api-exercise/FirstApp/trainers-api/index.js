import express from "express";
import { trainersRouter } from "./routes/trainers.routes.js";


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(express.json());
app.use('/trainers', trainersRouter); 


app.listen(PORT, HOST, () => {
  console.log(`Trainer API listening at http://localhost:${PORT}`);
})


// CRUD

// C - Create - POST
// R - Read - GET
// U - Update - PUT - celiot task da bide vraten, i da bide smeneto samo toa sto e smeneto  
//            - PATCH -  samo prakjam raboti sto sakam da gi update-tiram
// D - Delete - DELETE




