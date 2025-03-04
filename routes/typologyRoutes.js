const express = require('express');
const router = express.Router();
const {getAllTypologies, getTypology, addTypology, deleteTypology, updateTypology} = require('../controllers/typologyController');

//See all typologies
router.get('/', getAllTypologies);
//See all the courses of a certain typology
router.get('/:typology', getTypology);
//Add a typology
router.post('/', addTypology);
//Update a typology
router.put('/:id', updateTypology);
//Delete a typology
router.delete('/:id', deleteTypology);


module.exports = router;