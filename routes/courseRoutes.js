const express = require('express');
const router = express.Router();
const {getCourses, getCourseByName, addCourse, deleteCourse, updateCourse} = require('../controllers/courseController');

//See all the courses
router.get('/', getCourses);
//Find course by name
router.get('/name/:name', getCourseByName);
//Add a course
router.post('/', addCourse);
//Update a course
router.put('/:id', updateCourse);
//Delete a course
router.delete('/:id', deleteCourse);


module.exports = router;