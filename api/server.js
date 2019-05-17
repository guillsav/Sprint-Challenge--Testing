const express = require('express');
const helmet = require('helmet');
const server = express();
const moviesRouter = require('../movies/movies-router.js');

server.use(express.json());
server.use(helmet());
server.use('/api/movies', moviesRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome</h2>');
});

module.exports = server;
