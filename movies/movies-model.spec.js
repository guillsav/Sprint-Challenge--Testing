const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server.js');
const Movies = require('./movies-model.js');

describe('Movies model', () => {
  afterEach(async () => {
    await db('movies').truncate();
  });

  describe('POST /', () => {
    it('Add a movie', async () => {
      await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      const movies = await db('movies');
      expect(movies).toHaveLength(1);
    });

    it('should return action as movie genre', async () => {
      const movie = await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });
      expect(movie.genre).toBe('action');
    });
  });

  describe('GET /', () => {
    it('Should get all the movies', async () => {
      let movie = await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      movie = await Movies.addMovie({
        title: 'Titanic',
        genre: 'drama',
        releaseYear: 1997
      });

      const movies = await db('movies');
      expect(movies).toEqual([
        {id: 1, title: 'Avengers', genre: 'action', releaseYear: 2012},
        {id: 2, title: 'Titanic', genre: 'drama', releaseYear: 1997}
      ]);
      expect(movies).toHaveLength(2);
      expect;
    });
  });

  describe('GET /:id', () => {
    it('Should return a single movie', async () => {
      let movie = await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      const res = await request(server).get('/');
      expect(movie.id).toBe(1);
      expect(res.status).toBe(200);
    });

    it('should return a 404 status code', async () => {
      let movie = await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      const res = await request(server).get('/api/movies/2');
      expect(res.status).toBe(404);
      expect(res.notFound).toBe(true);
    });
  });
});
