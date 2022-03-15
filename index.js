//=============================================================================
// Basic Config
//=============================================================================
// import express
const express = require('express');
// create an app
const app = express();
// assign port dynamically
app.set('port', process.env.PORT || 8000);
// import cors
const cors = require('cors');

//=============================================================================
// Middleware
//=============================================================================
// Functions that run before the request gets sent to our controllers and before the response gets sent back to the client
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());

//=============================================================================
// ROUTES
//=============================================================================
// Redirect requests to '/' to '/api/bookmarks'
app.get('/', (req, res) => {
	return res.redirect('/api/bookmarks');
});

/* START CONTROLLERS HERE */

// Users Controller
const userController = require('./controllers/userController');
app.use('/api/users', userController);

// Bookmarks Controller
const bookmarkController = require('./controllers/bookmarkController');
app.use('/api/bookmarks', bookmarkController);

/* END CONTROLLERS HERE */

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
