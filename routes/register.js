const express = require('express');
const router = express.Router();

// Route for the register.html page
router.get('/', (req, res) => {
  res.sendFile('register.html', { root: 'public' }); // Send the HTML file
});

module.exports = router;