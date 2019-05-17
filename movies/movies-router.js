const router = require('express').Router();
const db = require('./movies-model.js');
const validation = require('../middleware/validation.js');

router.post('/', async (req, res) => {
  try {
    const newMovie = await db.addMovie();
    res.status(201).json(newMovie);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      errorMessage: 'Server error while adding the movie to the database.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await db.getMovies();
    res.status(201).json(movies);
  } catch (e) {
    res.status(500).json({
      errorMessage:
        'Server error while retrieving the movies from the database.'
    });
  }
});

module.exports = router;
