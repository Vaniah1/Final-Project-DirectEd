import express from "express"
const router = express.Router()
import { verifyToken, isAdmin, isSuper } from '../middleware/verify.middleware.js'
import  userController from '../controllers/user.controller.js'



// Get all students
router.get('/students', verifyToken, isAdmin | isSuper, userController.getAllStudents)



// Delete a student
router.delete('/students/:id', verifyToken, isAdmin |isSuper, userController.deleteStudent)




// Edit a student
router.put('/students/:id', verifyToken, isAdmin | isSuper, userController.updateStudent)

module.exports = router
