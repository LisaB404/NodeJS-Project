const Typology = require('../models/typologyModel');
const Course = require('../models/courseModel');

const getAllTypologies = async (req, res) => {
    try {
        const typologies = await Course.distinct("courseType"); // Estrai solo i tipi unici

        if (!typologies || typologies.length === 0) {
            return res.status(404).json({ message: "No typologies found." });
        }

        res.status(200).json(typologies);
    } catch (error) {
        res.status(500).json({ message: "Error while loading typologies", error: error.message });
    }
};

const getTypology = async (req, res) => {
    try {
        const { typology } = req.params;

        //courseType must be string
        if (!typology || typeof typology !== 'string') {
            return res.status(400).json({ message: "Invalid typology." });
        }

        // Escape special characters in regex
        const escapedTypology = typology.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        // make the search case insensitive
        const courses = await Course.find({ courseType: { $regex: escapedTypology, $options: 'i' } });
        
        if(courses.length === 0){
            return res.status(404).json({message: "No courses found for this typology."})
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addTypology = async (req, res) => {
    try {
        const typology = await Typology.create(req.body);
        res.status(200).json(typology);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteTypology = async (req, res) => {
    try {
        const { name } = req.params;
        const typology = await Typology.findOneAndDelete({name: new RegExp('^' + name + '$', 'i')});

        if(!typology) {
            return res.status(404).json({message: "Typology not found."});
        }
        
        res.status(200).json({message: "Typology deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateTypology = async (req, res) => {
    try {
        const { name } = req.params;
        const updatedTypology = await Typology.findOneAndUpdate({name: new RegExp('^' + name + '$', 'i')}, req.body, {new: true});

        if(!updatedTypology) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json(updatedTypology);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {getAllTypologies, getTypology, addTypology, deleteTypology, updateTypology};