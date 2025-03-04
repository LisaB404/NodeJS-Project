const University = require('../models/universityModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');

const getUniversities = async (req, res) => {
    try {
        const universities = await University.find({}).populate('courses'); // Add courses details
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addUniversity = async (req, res) => {
    try {
        const university = await University.create(req.body);
        res.status(200).json(university);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid university ID." });
        }

        const updatedUniversity = await University.findByIdAndUpdate(id, req.body, { new: true }); //{filter}, datas to add, {option to get updated document}

        if(!updatedUniversity) {
            return res.status(404).json({message: "University not found."});
        }
        
        res.status(200).json(updatedUniversity);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUniversity = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid university ID." });
        }

        const university = await University.findByIdAndDelete(id);

        if(!university) {
            return res.status(404).json({message: "University not found."});
        }
        
        res.status(200).json({message: "University deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getUniversities, addUniversity, updateUniversity, deleteUniversity};