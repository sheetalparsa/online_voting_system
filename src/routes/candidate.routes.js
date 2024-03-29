const express = require('express')
const router = express.Router()
const candidateController = require('../controllers/candidate.controllers')

// Retrieve all candidates
router.get('/candidates', candidateController.findAll);

// create a new candidate
router.post('/candidates', candidateController.create);

// Retrieve a single candidate with id
router.get('/candidates/:id', candidateController.findOne);

// Update a candidate with id
router.put('/candidates/:id', candidateController.update);

// Delete a candidate with id
router.delete('/candidates/:id', candidateController.delete);

module.exports = router
