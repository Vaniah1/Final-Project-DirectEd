import User from '../models/user.model.js'

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
    res.status(200).json(teachers)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
    res.status(200).json(students)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteTeacher = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('Teacher has been deleted...')
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('Student has been deleted...')
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedTeacher)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedStudent)
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  getAllTeachers,
  getAllStudents,
  deleteTeacher,
  deleteStudent,
  updateTeacher,
  updateStudent,
}
