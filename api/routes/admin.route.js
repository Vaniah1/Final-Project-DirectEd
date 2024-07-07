import express from "express"
const router = express.Router()

// Get all teachers
router.get('/teachers', verifyToken, isAdmin, userController.getAllTeachers)

// Delete a teacher
router.delete('/teachers/:id', verifyToken, isAdmin, userController.deleteTeacher)


router.put('/teachers/:id', verifyToken, isAdmin, userController.updateTeacher)