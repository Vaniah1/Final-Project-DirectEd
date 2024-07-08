import express from 'express'
import { addSubject, deleteSubject, getAllSubjects, getOneSubject, updateSubject } from '../controllers/subject.controller.js'

const router = express.Router()

router.post('/add', addSubject)


router.delete('/delete/:id', deleteSubject)


router.get('/get', getAllSubjects)
router.get('/get/:id', getOneSubject)


router.put('/update/:id', updateSubject)

export default router
