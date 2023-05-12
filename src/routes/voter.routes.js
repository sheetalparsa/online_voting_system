const express = require('express')
const router = express.Router()
const voterController = require('../controllers/voter.controllers')

// Retrieve all voters
router.get('/voters', voterController.findAll);

// create a new voter
router.post('/voters', voterController.create);

// Retrieve a single voter with id
router.get('/voters/:id', voterController.findOne);

// Update a voter with id
router.put('/voters/:id', voterController.update);

// Delete a voter with id
router.delete('/voters/:id', voterController.delete);

// vote a candidate
router.post('/voters/vote', voterController.vote);


module.exports = router
