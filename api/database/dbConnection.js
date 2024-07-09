import mongoose from "mongoose";



export const dbConnection = () => {
    mongoose.connect("mongodb+srv://smash:smash@learn.c1mgxaw.mongodb.net/?retryWrites=true&w=majority&appName=Learn")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
};

