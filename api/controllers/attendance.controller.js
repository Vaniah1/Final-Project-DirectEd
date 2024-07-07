import Attendance from '../models/attendance.model.js'

// Get all attendances
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
    res.status(200).json(attendances)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}