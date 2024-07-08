import express from "express"
const router = express.Router()
import { verifyToken, isAdmin, isSuper } from '../middleware/verify.middleware.js'
import  userController from '../controllers/user.controller.js'



// Get all students
router.get('/get', verifyToken,isSuper, userController.getAllStudents)
router.get("/get/id:", verifyToken, isSuper, userController.getOneStudent)



// Delete a student
router.delete('/delete/:id', verifyToken, isSuper, userController.deleteStudent)




// Edit a student
router.put('/update/:id', verifyToken,isSuper, userController.updateStudent)

export default router
