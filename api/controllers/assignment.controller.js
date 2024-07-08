//I am creating an assignment controller where I can get all assignments get one assignment delete assignment and then update assignment
import Assignment from "../models/assignments.model.js"

export const createAssignment = async (req, res) => {
    const newAssignment = new Assignment(req.body);
    try {
        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json(assignment);
        } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.json({ message: "Assignment deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateAssignment = async (req, res) => {
    try {
        const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAssignment) return res.status(404).json({ message: "Assignment not found" });
        res.json(updatedAssignment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}