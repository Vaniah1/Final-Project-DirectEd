import express from "express"
const router = express.Router()
import { verifyToken,isAdmin, isSuper } from "../middleware/verify.middleware.js"

// Get all teachers
router.get('/get', verifyToken, isSuper, )
router.get("/get/id:", verifyToken, isSuper, )

// Delete a teacher
router.delete('/delete/:id', verifyToken, isAdmin | isSuper, )


router.put('/update/:id', verifyToken, isAdmin | isSuper, )