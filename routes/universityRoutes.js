const express = require('express');
const router = express.Router();
const {getUniversities, addUniversity, updateUniversity, deleteUniversity} = require('../controllers/universityController');

//See all universities
router.get('/', getUniversities);
//Add a university
router.post('/', addUniversity);
//Update a university
router.put('/:id', updateUniversity);
//Delete a university
router.delete('/:id', deleteUniversity);


module.exports = router;