const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server.js');
const Movies = require('./movies-model.js');

describe('Movies model', () => {
  beforeEach(async () => {
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

    it('Add a movie', async () => {
      await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      const movies = await db('movies');
      expect(movies).toHaveLength(1);
    });

    it('should return 201 status code', async () => {
      await request(server)
        .post('/api/movies')
        .send({
          title: 'Black Panther',
          genre: 'action',
          releaseYear: 2012
        })
        .expect(201);
    });

    it('should return 422 status code', async () => {
      await request(server)
        .post('/api/movies')
        .send({
          title: '',
          genre: '',
          releaseYear: 2012
        })
        .expect(422);
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
    });

    it('should return 200 and empty array', async () => {
      await request(server)
        .get('/api/movies')
        .send([])
        .expect(200);
    });

    it('should return conten type JSON', async () => {
      await request(server)
        .get('/api/movies')
        .expect('Content-Type', /json/);
    });
  });
});
