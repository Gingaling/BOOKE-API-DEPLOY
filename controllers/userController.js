const express = require('express');
const router = express.Router();

const User = require('../models/User');

// INDEX: GET all users
// http://localhost:8000/api/users/
router.get('/', (req, res) => {
	// Query the database for all Users
	User.find().then((users) => {
		// Send it back as the json response
		res.json(users);
	});
});

module.exports = router;
