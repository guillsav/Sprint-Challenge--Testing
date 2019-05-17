const router = require('express').Router();
const db = require('./movies-model.js');
const validation = require('../middleware/validation.js');

router.post('/', validation, async (req, res) => {
  try {
    const newMovie = await db.addMovie(req.body);
    res.status(201).json(newMovie);
  } catch (e) {
    res.status(500).json({
      errorMessage: 'Server error while adding the movie to the database.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const movies = await db.getMovies();
    res.status(200).json(movies);
  } catch (e) {
    res.status(500).json({
      errorMessage:
        'Server error while retrieving the movies from the database.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await db.getMovie(req.body.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res
        .status(404)
        .json({errorMessage: `Movie with id ${req.params.id} not found.`});
    }
    res.status(200).json(movies);
  } catch (e) {
    res.status(500).json({
      errorMessage:
        'Server error while retrieving the movies from the database.'
    });
  }
});

module.exports = router;
