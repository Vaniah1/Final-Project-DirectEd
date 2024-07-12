const express = require('express')
const multer = require('multer')
const { spawn } = require('child_process')
const mongoose = require('mongoose')
const Admin = require('../models/adminSchema')
const dotenv = require("dotenv")
dotenv.config()

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// POST route to handle image upload and processing
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path
    
    // Call Python script to process the image
    const pythonProcess = spawn('python', ['path/to/your/python_script.py', imagePath])
    
    let faceId = ''
    pythonProcess.stdout.on('data', (data) => {
      faceId = data.toString().trim()
    })

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'Face processing failed' })
      }

      // Save user data to MongoDB
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        schoolName: req.body.schoolName,
        faceId: faceId
      })

      await newAdmin.save()
      res.status(201).json({ message: 'User registered successfully', faceId: faceId })
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST route to validate face
router.post('/validate', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path
    const userId = req.body.userId

    const user = await Admin.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Call Python script to validate the face
    const pythonProcess = spawn('python', ['path/to/your/validation_script.py', imagePath, user.faceId])
    
    let validationResult = ''
    pythonProcess.stdout.on('data', (data) => {
      validationResult = data.toString().trim()
    })

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'Face validation failed' })
      }

      if (validationResult === 'match') {
        res.json({ valid: true, message: 'Face validated successfully' })
      } else {
        res.json({ valid: false, message: 'Face validation failed' })
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
