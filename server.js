const express = require('express');
const blogPostsRouter = require('./routes/blogPostsRoutes');
const server = express();
server.use(express.json());

//Routes
server.use('/api/posts', blogPostsRouter);

//Default send
server.get('/', async (req, res) => {
	res.send(`
      <h2>API working on port 5000</h2>
    `);
});

module.exports = server;