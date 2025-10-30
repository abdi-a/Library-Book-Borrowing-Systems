// src/controllers/booksController.js
const Book = require('../models/Book');

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addBook };
