import { Router } from "express";
import Student from "../models/user.model.js";

const app = Router(); 


// Endpoint to receive face ID
app.post('/register', async (req, res) => {
    const { face_id } = req.body;

    if (!face_id) {
        return res.status(400).send('Face ID is required.');
    }

    try {
        const student = await Student.findOneAndUpdate(
            { faceId: face_id },
            { faceId: face_id },
            { new: true, upsert: true }
        );
        res.status(200).send('Face ID stored successfully.');
    } catch (error) {
        res.status(500).send('Error storing Face ID.');
    }
});


export default app;