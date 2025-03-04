const University = require('../models/universityModel');
const Course = require('../models/courseModel');


const getUniversities = async (req, res) => {
    try {
        const universities = await University.find({}).populate('courses'); // Popola i dettagli dei corsi
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
        const updatedUniversity = await University.findByIdAndUpdate(id, req.body, { new: true }); //{filtro}, dati da aggiornare, {opzione per restituire documenti aggiornato}

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