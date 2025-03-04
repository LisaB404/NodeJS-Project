const Course = require('../models/courseModel');
const University = require('../models/universityModel');
const mongoose = require('mongoose');

const getCourses = async (req, res) => {
try {
        const courses = await Course.find({}).populate('universities');// Add universities details
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCourseByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Input validation
        if (!name || typeof name !== 'string' || name.length < 2) {
            return res.status(400).json({ message: "Invalid course name." });
        }

        const courses = await Course.find({ name: { $regex: name, $options: 'i' } }); //search any name with the text added
        
        if(courses.length === 0){
            return res.status(404).json({message: "No courses found with this name."})
        }
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: "Server error."});
    }
}

const addCourse = async (req, res) => {
    const { name, courseType, universities } = req.body

    //Input validation
    if (!name || !courseType || !Array.isArray(universities)) {
        return res.status(400).json({ message: "Invalid input data." });
    }

    // Check that ID is a valid ObjectId
    const validUniversities = universities.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validUniversities) {
        return res.status(400).json({ message: "Invalid university ID format." });
    }

    const newCourse = new Course({ name, courseType, universities })

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

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid course ID." });
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });

        if(!updatedCourse) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({message: "Server error."});
    }
}

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid course ID." });
        }

        const course = await Course.findByIdAndDelete(id);

        if(!course) {
            return res.status(404).json({message: "Course not found."});
        }
        
        res.status(200).json({message: "Course deleted successfully."});
    } catch (error) {
        res.status(500).json({message: "Server error."});
    }
}


module.exports = {getCourses, getCourseByName, addCourse, deleteCourse, updateCourse};