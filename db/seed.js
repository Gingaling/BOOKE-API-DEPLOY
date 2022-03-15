// Create new users programmatically

// Bring in pre-configured Mongoose connection
const mongoose = require('./connection');

// Import User Model
const User = require('../models/User');

// Import Users Seed Data
const userSeeds = require('./users.json');

// Create many users at once from the seed data
User.insertMany(userSeeds)
	// receive created users and console.log
	.then((users) => {
		console.log('success!', users);
	})
	// in case of error, log it!
	.catch(console.error)
	// when finished, hang up the mongodb connection
	.finally(() => {
		process.exit();
	});

