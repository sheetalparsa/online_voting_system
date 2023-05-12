const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controllers');

// Retrieve all admins
router.get('/admins', adminController.findAll);

// Create a new admin
router.post('/admins', adminController.create);

// Retrieve a single admin with id
router.get('/admins/:id', adminController.findOne);

// Update a admin with id
router.put('/admins/:id', adminController.update);

// Delete a admin with id
router.delete('/admins/:id', adminController.delete);

module.exports = router
