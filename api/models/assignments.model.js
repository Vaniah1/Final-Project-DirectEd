import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }]
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

export default Assignment
