const mongoose = require('../db/connection');

// Blueprint for our model
const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	name: String,
});

// Initiating a model for the schema that we created so that we can interface with this data
const User = mongoose.model('User', UserSchema);

// Export so other files can access
module.exports = User;
