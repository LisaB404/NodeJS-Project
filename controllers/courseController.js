const Course = require('../models/courseModel');
const University = require('../models/universityModel');


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
            return res.status(404).json({message: "No courses found with this name."})
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCourseByTypology = async (req, res) => {
    try {
        const { typology } = req.params;
        const courses = await Course.find({ courseType: { $regex: typology, $options: 'i' } }); //search any typology with the text added
        
        if(courses.length === 0){
            return res.status(404).json({message: "No courses found for this typology."})
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addCourse = async (req, res) => {
    const { name, courseType, universities } = req.body
    const newCourse = new Course({ name, courseType, universities }) // Crea una nuova istanza del modello di corso con i dati forniti

    try {
        const savedCourse = await newCourse.save();
        await University.updateMany(
            { _id: { $in: universities } },
            { $push: { courses: savedCourse._id } }
        );

        res.json(savedCourse);
    } catch (error) {
        console.log('Error while uploading course.', error);
        res.status(500).json({ error: 'Error while uploading course.' });
    }
}

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true }); //{filtro}, dati da aggiornare, {opzione per restituire documenti aggiornato}

        if(!updatedCourse) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);

        if(!course) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json({message: "Course deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {getCourses, getCourseByName, getCourseByTypology, addCourse, deleteCourse, updateCourse};