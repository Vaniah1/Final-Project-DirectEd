import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';



dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
const MONGO_URL = "mongodb+srv://smash:smash@learn.c1mgxaw.mongodb.net/?retryWrites=true&w=majority&appName=Learn"

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB server');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});



app.use("/api/user", )