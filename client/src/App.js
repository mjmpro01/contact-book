import React, { useState, useEffect } from 'react';
import axios from 'axios';
const APIURL = 'http://192.168.1.8:3005/api/contacts';
function ContactBook() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [editContact, setEditContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(APIURL);
      setContacts(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch contacts. Please try again.');
      showErrorModal();
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(APIURL, formData);
      setContacts([...contacts, response.data]);
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error(error);
      setError('Failed to add contact. Please try again.');
      showErrorModal(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${APIURL}/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error(error);
      setError('Failed to delete contact. Please try again.');
      showErrorModal(error);
    }
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setShowEditModal(true);
    setIsEditMode(true);
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${APIURL}/${editContact._id}`, formData);
      const updatedContact = response.data;
      setContacts(
        contacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      setEditContact(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
      setShowEditModal(false);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      setError('Failed to update contact. Please try again.');
      showErrorModal(error);
    }
  };

  const showErrorModal = (error) => {
    alert(error.response.data.error)
  };

  return (
    <div className="container">
      <h1>Contact Book</h1>

      <form onSubmit={isEditMode ? handleUpdateContact : handleAddContact}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isEditMode}>
          {isEditMode ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEditContact(contact)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`modal fade ${showEditModal ? 'show' : ''}`}
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden={!showEditModal}
        style={{ display: showEditModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setShowEditModal(false);
                  setIsEditMode(false);
                }}
              ></button>
            </div>
            <form onSubmit={handleUpdateContact}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="errorModal"
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">
                Error
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactBook;
