import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        default:[],
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    faceId: {
        type: String,
        required: true
    }
},{timestamps:true})

const Student = mongoose.model("Student", studentSchema)
export default Student