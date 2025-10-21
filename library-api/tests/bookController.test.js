const { addBook } = require('../src/controllers/booksController');
const Book = require('../src/models/Book');

// Mock Book model
jest.mock('../src/models/Book');

test('addBook creates a new book', async () => {
  const req = { body: { title: 'Harry Potter', author: 'J.K. Rowling' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  Book.create.mockResolvedValue(req.body);

  await addBook(req, res);

  expect(Book.create).toHaveBeenCalledWith(req.body);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(req.body);
});
