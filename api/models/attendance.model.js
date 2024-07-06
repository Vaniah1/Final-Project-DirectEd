import mongoose from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  }
}, {
  timestamps: true
})

const Attendance = mongoose.model('Attendance', AttendanceSchema)

export default Attendance
