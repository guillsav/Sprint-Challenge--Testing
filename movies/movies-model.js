const db = require('../data/dbConfig.js');

module.exports = {
  getMovies,
  getMovie,
  addMovie
};

function getMovies() {
  return db('movies').select('title', 'genre', 'releaseYear');
}

function getMovie(id) {
  return db('movies')
    .where({id})
    .first();
}

async function addMovie(movie) {
  const [id] = await db('movies').insert(movie);
  return db('movies')
    .where({id})
    .first();
}
