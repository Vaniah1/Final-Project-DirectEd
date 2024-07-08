import express from "express"
const router = express.Router()
import { verifyToken, isAdmin, isSuper } from '../middleware/verify.middleware.js'
import  userController from '../controllers/user.controller.js'



// Get all students
router.get('/get', verifyToken, isAdmin | isSuper, userController.getAllStudents)
router.get("/get/id:", verifyToken, isAdmin | isSuper, userController.getOneStudent)



// Delete a student
router.delete('/delete/:id', verifyToken, isAdmin |isSuper, userController.deleteStudent)




// Edit a student
router.put('/update/:id', verifyToken, isAdmin | isSuper, userController.updateStudent)

module.exports = router
