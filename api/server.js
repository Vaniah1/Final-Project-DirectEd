import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from "./routes/auth.route.js";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
const MONGO_URL = "mongodb+srv://smash:smash@learn.c1mgxaw.mongodb.net/?retryWrites=true&w=majority&appName=Learn"




app.use("/api/auth",authRoutes)

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB server');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

const __dirname = path.resolve()

