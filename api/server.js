const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome</h2>');
});

module.exports = server;
