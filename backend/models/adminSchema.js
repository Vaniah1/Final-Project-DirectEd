const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    faceId:{
        type: String,
        unique: true,
        required: true
    },
    encoding:{
        type: Array,
        required: true

    },
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("admin", adminSchema)