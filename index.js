import express from "express";
import mongoose from 'mongoose';
import { PORT } from "./config.js";
import { Book } from './models/bookmodel.js';
import BooksRoute from './routes/BooksRoute.js';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());//allow all orgins with default cors(*)

// app.use(
//   cors({
//     orgin: 'http://localhost:3000',
//     methods: ['GET', 'POST','PUT','DELETE'],
//     allowesHeaders: ['Content=Type'],
//   })
// );


app.get('/', (req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome");
});


app.use('/books', BooksRoute);

mongoose
    .connect(process.env.MONGOURL)
    .then(()=>{
      console.log("App connected to database");
      app.listen(PORT, ()=>{
        console.log(`App is listen to port: ${PORT}`);
      });
})
.catch((err)=>{
    console.log(err)
});

