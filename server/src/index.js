const express = require('express');
const mongoose = require('mongoose');
const contactsRoute = require('./routes/contactsRoute');
require('dotenv').config()
const app = express();
const port = 3000;
const databaseURL = process.env.DATABASE_URL
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
  
app.use(express.json());

app.use('/contacts', contactsRoute);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});