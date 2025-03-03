const express = require('express');
const router = express.Router();
const Typology = require('../models/typologyModel');
const {getAllTypologies, getTypology, addTypology, deleteTypology, updateTypology} = require('../controllers/typologyController');

//See all typologies
router.get('/', getAllTypologies);
//See all the courses of a certain typology
router.get('/:typology', getTypology);
//Add a course
router.post('/', addTypology);
//Update a course
router.put('/:typology', deleteTypology);
//Delete a course
router.delete('/:typology', updateTypology);


module.exports = router;