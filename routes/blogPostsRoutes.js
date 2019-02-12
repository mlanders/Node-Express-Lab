const express = require('express');

const db = require('../data/db');

const router = express.Router();

// *************************************** POST

router.post('/', async (req, res) => {
	try {
		const { title, contents } = req.body;
		const post = { title, contents };
		if (!title || !contents) {
			res.status(400).json({ message: 'Please provide title and contents for the post' });
		} else {
			const posts = await db.insert(post);
			res.status(201).json({ success: true, posts }); //Need to return the full post
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error retrieving the posts',
		});
	}
});

// *************************************** GET all posts

router.get('/', async (req, res) => {
	try {
		const posts = await db.find();
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'The posts information could not be retrieved.',
		});
	}
});

// *************************************** GET post by id

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const post = await db.findById(id);
		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'The post with the specified ID does not exist.',
		});
	}
});

module.exports = router;
