const Course = require('../models/courseModel');

const getCourses = async (req, res) => {
try {
        const courses = await Course.find({}).populate('universities'); // Popola i dettagli delle università
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCourseByName = async (req, res) => {
    try {
        const { name } = req.params;
        const courses = await Course.find({ name: { $regex: name, $options: 'i' } }); //search any name with the text added
        
        if(courses.length === 0){
            return res.status(404).json({message: "No courses found."})
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addCourse = async (req, res) => {
        try {
            const course = await Course.create(req.body);
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

const deleteCourse = async (req, res) => {
    try {
        const { name } = req.params;
        const course = await Course.findOneAndDelete({name: new RegExp('^' + name + '$', 'i')});

        if(!course) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json({message: "Course deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCourse = async (req, res) => {
    try {
        const { name } = req.params;
        const updatedCourse = await Course.findOneAndUpdate({name: name}, req.body, {new: true}); //{filtro}, dati da aggiornare, {opzione per restituire documenti aggiornato}

        if(!updatedCourse) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getCourses, getCourseByName, addCourse, deleteCourse, updateCourse};