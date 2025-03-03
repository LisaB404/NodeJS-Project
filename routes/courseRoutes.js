const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');
const {getCourses, getCourseByName, addCourse, deleteCourse, updateCourse} = require('../controllers/courseController');

//See all the courses
router.get('/', getCourses);
//Find course by name
router.get('/name/:name', getCourseByName);
//Add a course
router.post('/', addCourse);
//Update a course
router.put('/name:name', updateCourse);
//Delete a course
router.delete('/name/:name', deleteCourse);


module.exports = router;