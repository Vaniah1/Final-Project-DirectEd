import express from 'express'
import {
  createPerformance,
  getAllPerformances,
  getPerformance,
  updatePerformance,
  deletePerformance
} from '../controllers/performance.controller.js'

const router = express.Router()

router.post('/add', createPerformance)
router.get('/get', getAllPerformances)
router.get('/get/:id', getPerformance)
router.put('/update/:id', updatePerformance)
router.delete('/delete/:id', deletePerformance)

export default router