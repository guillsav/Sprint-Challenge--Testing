const db = require('../data/dbConfig');
const Movies = require('./movies-model.js');

describe('Movies model', () => {
  afterEach(async () => {
    await db('movies').truncate();
  });

  describe('', () => {
    it('Add a movie', async () => {
      await Movies.addMovie({
        title: 'Avengers',
        genre: 'action',
        releaseYear: 2012
      });

      const movies = await db('movies');
      expect(movies).toHaveLength(1);
    });
  });
});
