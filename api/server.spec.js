const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('Should set the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('GET /', () => {
  it('Should return a status of 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });

  it('Should return HTML as response type ', async () => {
    const res = await request(server).get('/');
    expect(res.type).toBe('text/html');
  });
});
