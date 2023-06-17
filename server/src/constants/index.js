const Contact = require("../models/contact");

ERROR_CODE = {
  SERVER_ERROR: 'server_error',
  FAIL_TO_FETCH_CONTACT: 'failed_to_create_contact',
  CONTACT_NOT_FOUND: 'contact_not_found',
  FAIL_TO_DELETE_CONTACT: 'failed_to_delete_contact'
};

module.exports = {
  ERROR_CODE
}