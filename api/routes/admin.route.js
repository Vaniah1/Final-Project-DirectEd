import express from "express"
const router = express.Router()
import { verifyToken, isSuper } from "../middleware/verify.middleware.js"
import teacherController from "../controllers/user.controller.js"

// Get all teachers
router.get('/get', verifyToken, isSuper, teacherController.getAllTeachers )
router.get("/get/id:", verifyToken, isSuper, teacherController.getOneTeacher )

// Delete a teacher
router.delete('/delete/:id', verifyToken, isSuper, teacherController.deleteTeacher )


router.put('/update/:id', verifyToken, isSuper, teacherController.updateTeacher )


export default router