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

// CREATE: POST a new user
// http://localhost:8000/api/users/
router.post('/', (req, res) => {
	// Grab the new user data out of the request body
	const newUser = req.body;
	// Use the User model to create a new instance of a User with that data
	User.create(newUser).then((user) => {
		// Send back the newly created user document as json data
		res.json(user);
	});
});

// YOU DO: SHOW an individual user
// http://localhost:8000/api/users/id
router.get('/:id', async (req, res) => {
	// Async/await syntax
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			res.json(user);
		} else {
			// if user doesn't exist, send back 404
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
	}

	// Promise-chaining syntax
	// User.findById(req.params.id)
	// 	.then((user) => res.json(user))
	// 	.catch(console.error);
});

// UPDATE: EDIT an individual user
// http://localhost:8000/api/users/id
router.put('/:id', async (req, res) => {
	try {
		const updatedUser = req.body;
		const updatedDocument = await User.findByIdAndUpdate(
			req.params.id,
			updatedUser,
			{ new: true }
		);
		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
	}
});

// DELETE: REMOVE an individual user
// http://localhost:8000/api/users/id
router.delete('/:id', async (req, res) => {
	try {
		const userToDelete = await User.findByIdAndDelete(req.params.id);
		res.json(userToDelete);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
