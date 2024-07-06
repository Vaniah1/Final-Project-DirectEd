import express from "express"
const router = express.Router()
import { verifyToken, verifyAdmin } from '../middleware/verify.middleware.js'
import  userController from './controllers/user.controller.js'

// Get all teachers
router.get('/teachers', verifyToken, verifyAdmin, userController.getAllTeachers)

// Get all students
router.get('/students', verifyToken, verifyAdmin, userController.getAllStudents)

// Delete a teacher
router.delete('/teachers/:id', verifyToken, verifyAdmin, userController.deleteTeacher)

// Delete a student
router.delete('/students/:id', verifyToken, verifyAdmin, userController.deleteStudent)

// Edit a teacher
router.put('/teachers/:id', verifyToken, verifyAdmin, userController.updateTeacher)

// Edit a student
router.put('/students/:id', verifyToken, verifyAdmin, userController.updateStudent)

module.exports = router
