const request = require('supertest');
const app = require('../src/app'); // Import only the app, not server
const mongoose = require('mongoose');

describe('Books API', () => {
  // close DB connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /api/books creates a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({ title: '1984', author: 'George Orwell' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });
});
