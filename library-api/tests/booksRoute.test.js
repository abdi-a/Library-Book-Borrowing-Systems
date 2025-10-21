const request = require('supertest');
const app = require('../src/app'); // your express app

describe('Books API', () => {
  it('POST /api/books creates a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({ title: '1984', author: 'George Orwell' });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('1984');
  });
});
