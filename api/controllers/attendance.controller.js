import Attendance from '../models/attendance.model.js'
import Student from '../models/user.model.js'

// Get all attendances
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
    res.status(200).json(attendances)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



export const signAttendance = async (req, res) => {
  try {
    const { faceId } = req.body
    const student = await Student.findOne({ faceId })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    const attendance = new Attendance({ student: student._id, date: new Date() })
    await attendance.save()
    res.status(201).json(attendance)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
