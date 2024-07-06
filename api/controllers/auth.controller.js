import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

//sign up for teachers, principal and students

export const signupStudent = async (req, res) => {
    const { name, email, password, gender, dateOfBirth, location, subjects, classId } = req.body;
    try {
        const user = await Student.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "Student already exists" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new Student({ name, email, password:hashedPassword, gender, dateOfBirth, location, subjects, classId })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const signupTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Admin.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "Teacher already exists" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new Admin({ name, email, password:hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
export const signUpPricipal = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Super.findOne({ email: email })
        if (user) {
            return res.status(400).json({ message: "Principal already exists" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new Admin({ name, email, password:hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
