const express = require('express');
const cors = require('cors');
const blogPostsRouter = require('./routes/blogPostsRoutes');
const server = express();
server.use(express.json());
server.use(cors());

//Routes
server.use('/api/posts', blogPostsRouter);

//Default send
server.get('/', async (req, res) => {
	res.send(`
      <h2>Sanity check! Woot!</h2>
    `);
});

module.exports = server;
