const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// CREATE: post a new bookmark
router.post('/', async (req, res) => {
	try {
		const newBookmark = await Bookmark.create(req.body);
		res.status(201).json(newBookmark);
	} catch (error) {
		console.log(error);
	}
});

// You Do:
// INDEX: get all bookmarks
// http://localhost:8000/api/bookmarks
router.get('/', (req, res) => {
	Bookmark.find()
		.populate('owner')
		.then((bookmarks) => {
			return res.json(bookmarks);
		});
});

// async/await
// router.get('/', async (req, res) => {
// 	try {
// 		const bookmarks = await Bookmark.find().populate('owner');
// 		res.json(bookmarks);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

// SHOW: get an individual bookmark by id
router.get('/:id', async (req, res) => {
	try {
		const bookmark = await Bookmark.findById(req.params.id);
		if (bookmark) {
			res.send(bookmark);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
	}
});

// UPDATE -- edit an individual bookmark
// http://localhost:8000/api/bookmarks/id
router.put('/:id', async (req, res) => {
	try {
		const updatedBookmark = req.body;
		const updatedDocument = await Bookmark.findByIdAndUpdate(
			req.params.id,
			updatedBookmark,
			{ new: true }
		);
		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
	}
});

// DELETE: REMOVE an individual bookmark
// http://localhost:8000/api/bookmarks/id
router.delete('/:id', async (req, res) => {
	try {
		const bookmarkToDelete = await Bookmark.findByIdAndDelete(req.params.id);
		if (bookmarkToDelete) {
			// res.json(bookmarkToDelete);
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
