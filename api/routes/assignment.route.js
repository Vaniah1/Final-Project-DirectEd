import express from 'express'
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/assignment.controller'

const router = express.Router()

router.post("/add",createAssignment)

router.get("/get/id:",getAssignmentById)
router.get("/get",getAllAssignments)

router.put("/update/id:",updateAssignment)
router.delete("/delete/id:",deleteAssignment)



export default router