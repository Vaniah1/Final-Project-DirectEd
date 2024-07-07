import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, )

const Admin = mongoose.model("Admin", adminSchema)
export default Admin
