// routes/contactsRoute.js
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const validateContact = require('../middlewares/validateContact');

// Define routes
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', validateContact, contactsController.createContact);
router.put('/:id', validateContact,contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
