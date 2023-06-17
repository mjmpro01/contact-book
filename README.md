# Contact Book API

Welcome to the Contact Book API documentation. This API allows you to manage contacts in your address book.

## Installation

To run the Contact Book API locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mjmpro01/contact-book.git
2. Install the dependencies for Backend:
  
    ```bash
    cd contact-book
    cd server
    npm install
3. Set up the database:
- Create a new file called `.env` and copy content like file `.env_example`

4. Start the server:
    ```bash 
    npm start
# API Endpoints
## The Contact Book API provides the following endpoints:

### 1. Get All Contacts
URL: /api/contacts  
Method: GET  
Description: Retrieves a list of all contacts in the address book.  
Response: Returns an array of contact objects.

### 2. Get a Single Contact
URL: /api/contacts/:id  
Method: GET  
Description: Retrieves a specific contact by its ID.  
Parameters: The contact ID is specified as a URL   parameter.  
Response: Returns the contact object with the specified ID.

### 3. Create a New Contact
URL: /api/contacts  
Method: POST  
Description: Creates a new contact in the address book.  
Request Body: Requires a JSON object with the following properties:  
- name (string): The name of the contact.  
- email (string): The email address of the contact.  
- phone (string): The phone number of the contact.  

Response: Returns the newly created contact object.  
### 4. Update a Contact  
URL: /api/contacts/:id  
Method: PUT  
Description: Updates an existing contact in the address book.  
Parameters: The contact ID is specified as a URL parameter.  
Request Body: Requires a JSON object with the following properties (any or all can be updated):  
  - name (string): The updated name of the contact.  
  - email (string): The updated email address of the  contact.
  - phone (string): The updated phone number of the contact.

Response: Returns the updated contact object.  
### 5. Delete a Contact
URL: /api/contacts/:id  
Method: DELETE  
Description: Deletes a contact from the address book.  
Parameters: The contact ID is specified as a URL parameter.  
Response: Returns a success message if the contact was successfully deleted.  