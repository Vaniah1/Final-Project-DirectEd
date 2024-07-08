import Admin from '../models/admin.model.js'
import User from '../models/user.model.js'

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Admin.find({ role: 'teacher' })
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
    await Admin.findByIdAndDelete(req.params.id)
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
    const updatedTeacher = await Admin.findByIdAndUpdate(
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

const getOneTeacher = async (req, res) => {
  try {
    const teacher = await Admin.findById(req.params.id)
    res.status(200).json(teacher)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getOneStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getTeacherCount = async (req, res) => {
  try {
    const { limit = 10, skip = 0, sort = { _id: 1 }, filters = {} } = req.query
    const teacherCount = await Class.aggregate([
      { $unwind: '$teacher' },
      { $match: filters },
      { $group: { _id: '$teacher', count: { $sum: 1 } } },
      { $sort: sort },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
      { $group: { _id: null, count: { $sum: '$count' } } }
    ])
    res.status(200).json({ count: teacherCount[0]?.count || 0 })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
  const getStudentCount = async (req, res) => {
    try {
      const { limit = 10, skip = 0, sort = { _id: 1 }, filters = {} } = req.query
      const studentCount = await Class.aggregate([
        { $unwind: '$students' },
        { $match: filters },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $sort: sort },
        { $skip: parseInt(skip) },
        { $limit: parseInt(limit) }
      ])
      res.status(200).json({ count: studentCount[0]?.count || 0 })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

export default {
  getAllTeachers,
  getAllStudents,
  deleteTeacher,
  deleteStudent,
  updateTeacher,
  updateStudent,
  getOneTeacher,
  getOneStudent,
  getTeacherCount,
    getStudentCount
}