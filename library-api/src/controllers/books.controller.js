const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};


// GET /api/books?author=&title=&page=&limit=&sort=
exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', title, author } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit));

    const filter = {};
    if (title) filter.title = new RegExp(title, 'i'); // case-insensitive partial
    if (author) filter.author = new RegExp(author, 'i');

    const booksQuery = Book.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort(sort)
      .lean();

    const [books, total] = await Promise.all([booksQuery.exec(), Book.countDocuments(filter)]);
    res.json({ data: books, meta: { page: pageNum, limit: limitNum, total } });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, totalCopies = 1, category, isbn, description } = req.body;
    const book = new Book({
      title, author, totalCopies, availableCopies: totalCopies, category, isbn, description
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    // handle duplicate isbn error nicely
    if (err.code === 11000) return res.status(409).json({ message: 'Duplicate field', detail: err.keyValue });
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updates = req.body;
    // If totalCopies changed, adjust availableCopies accordingly (simple approach)
    if (updates.totalCopies !== undefined) {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      const diff = updates.totalCopies - book.totalCopies;
      book.totalCopies = updates.totalCopies;
      book.availableCopies = Math.max(0, book.availableCopies + diff);
      Object.assign(book, updates);
      await book.save();
      return res.json(book);
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
