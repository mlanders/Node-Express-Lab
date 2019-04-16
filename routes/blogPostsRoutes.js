const express = require('express');

const db = require('../data/db');

const router = express.Router();

// *************************************** POST

router.post('/', async (req, res) => {
	try {
		const { title, contents } = req.body;
		const newPost = { title, contents };
		if (!title || !contents) {
			res.status(400).json({ message: 'Please provide title and contents for the post' });
		} else {
			const post = await db.insert(newPost);
			const completePost = await db.findById(post.id);
			res.status(201).json({ success: true, completePost }); //Need to return the full post
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'Error retrieving the posts',
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
			error: 'The posts information could not be retrieved.',
		});
	}
});

// *************************************** GET post by id

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const post = await db.findById(id);
		console.log(post);
		if (post[0]) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'The post information could not be retrieved.',
		});
	}
});

// *************************************** DELETE post by id

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const post = await db.remove(id);
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			merror: 'The post could not be removed',
		});
	}
});

// *************************************** PUT post by id

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, contents } = req.body;
		const changes = req.body;

		if (!title || !contents) {
			res.status(400).json({ message: 'Please provide title and contents for the post' });
		} else {
			const post = await db.findById(id);
			if (post[0].id) {
				const status = await db.update(id, changes);
				const updated = await db.findById(id);
				res.status(200).json(updated);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'The post information could not be modified.',
		});
	}
});

module.exports = router;
