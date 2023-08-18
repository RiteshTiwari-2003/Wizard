const express = require('express');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/register'); // Import the router
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configure MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'your_password',
//   database: 'registration_db', // Create a database named 'registration_db'
// });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'registration_db',
});
// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));
// Set up middleware and static files serving (if needed)

app.use(express.static('public')); // Serve static files from the 'public' directory

// Mount the router
app.use('/register', registerRouter);

// Handle form submission
app.post('/submit', (req, res) => {
  const { category, username, name, company, skills, email, phone, license_number } = req.body;

  let prefixedUsername = '';
  if (category === 'Client') {
    prefixedUsername = 'CL-' + username;
  } else if (category === 'Labour') {
    prefixedUsername = 'LA-' + username;
  } else if (category === 'Contractor') {
    prefixedUsername = 'CO-' + username;
  }

  const query = 'INSERT INTO users (category, username, name, company, skills, email, phone, license_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [category, prefixedUsername, name, company, skills, email, phone, license_number];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred.' });
    } else {
      res.json({ message: 'Registration successful!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});