import Class from "../models/class.model.js"

export const createClass = async (req, res) => {
  try {
    const { name, description, teacher, students } = req.body
    const newClass = new Class({ name, description, teacher, students })
    await newClass.save()
    res.status(201).json(newClass)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateClass = async (req, res) => {
  try {
    const { id, name, description, teacher, students } = req.body
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, description, teacher, students, updatedAt: Date.now() },
      { new: true }
    )
    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" })
    }
    res.status(200).json(updatedClass)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.body
    const deletedClass = await Class.findByIdAndDelete(id)
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" })
    }
    res.status(200).json({ message: "Class deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getClassCount = async (req, res) => {
  try {
    const { limit = 10, skip = 0, sort = { _id: 1 } } = req.query
    const classCount = await Class.countDocuments().sort(sort).skip(skip).limit(limit)
    res.status(200).json({ count: classCount })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllClasses = async (req, res) => {
  try {
    const { limit = 10, skip = 0, sort = { _id: 1 }, filters = {} } = req.query
    const classes = await Class.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
    res.status(200).json(classes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getClass = async (req, res) => {
try {
const { id } = req.params
const classData = await Class.findById(id)
if (!classData) {
return res.status(404).json({ error: 'Class not found' })
}
res.status(200).json(classData)
} catch (error) {
res.status(500).json({ error: error.message })
}
}