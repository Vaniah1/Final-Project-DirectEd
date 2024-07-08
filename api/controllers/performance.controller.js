import Performance from '../models/performance.model.js'

// Create a new performance
exports.createPerformance = async (req, res) => {
  try {
    const newPerformance = new Performance(req.body)
    const savedPerformance = await newPerformance.save()
    res.status(201).json(savedPerformance)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Get all performances
exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.find()
    res.json(performances)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get a single performance
exports.getPerformance = async (req, res) => {
  try {
    const performance = await Performance.findById(req.params.id)
    if (!performance) {
      return res.status(404).json({ error: 'Performance not found' })
    }
    res.json(performance)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update a performance
exports.updatePerformance = async (req, res) => {
  try {
    const updatedPerformance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedPerformance) {
      return res.status(404).json({ error: 'Performance not found' })
    }
    res.json(updatedPerformance)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete a performance
exports.deletePerformance = async (req, res) => {
  try {
    const deletedPerformance = await Performance.findByIdAndDelete(req.params.id)
    if (!deletedPerformance) {
      return res.status(404).json({ error: 'Performance not found' })
    }
    res.json({ message: 'Performance deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
