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

