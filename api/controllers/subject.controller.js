import Subject from "../models/subject.model.js"



export const addSubject = async (req, res) => {
  try {
    const { name, description } = req.body
    const subject = await Subject.create({ name, description })
    res.status(201).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params
    const subject = await Subject.findByIdAndDelete(id)
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    res.status(200).json({ message: 'Subject deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
  export const getAllSubjects = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc' } = req.query
      const skip = (page - 1) * limit
      const filters = { name: { $regex: search, $options: 'i' } }
      const sortCriteria = { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
      const subjects = await Subject.find(filters)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
      const totalCount = await Subject.countDocuments(filters)
      res.status(200).json({ subjects, totalCount })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const subject = await Subject.findByIdAndUpdate(id, { name, description }, { new: true })
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    res.status(200).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getOneSubject = async (req, res) => {
  try {
    const { id } = req.params
    const subject = await Subject.findById(id)
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    res.status(200).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
