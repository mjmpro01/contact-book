// controllers/contactsController.js
const Contact = require('../models/contact');
const { ERROR_CODE } = require('../constants')
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    res.status(500).json({ error: ERROR_CODE.FAIL_TO_FETCH_CONTACT });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ error: ERROR_CODE.CONTACT_NOT_FOUND });
    } else {
      res.json(contact);
    }
  } catch (error) {
    console.error('Failed to fetch contact:', error);
    res.status(500).json({ error: ERROR_CODE.FAIL_TO_FETCH_CONTACT });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ error: ERROR_CODE.FAIL_TO_FETCH_CONTACT });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({ error: ERROR_CODE.CONTACT_NOT_FOUND });
    } else {
      res.json(updatedContact);
    }
  } catch (error) {
    console.error('Failed to update contact:', error);
    res.status(500).json({ error: ERROR_CODE.FAIL_TO_UPDATE_CONTACT });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    if (!deletedContact) {
      res.status(404).json({ error: 'Contact not found' });
    } else {
      res.status(204).json({ error: 'Contact deleted successfully' });
    }
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ error: ERROR_CODE.FAIL_TO_DELETE_CONTACT });
  }
};
