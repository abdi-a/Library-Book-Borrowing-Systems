const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports.borrowBook = async (req, res, next) => {
  try {
    const userId = req.user._id; // assume auth middleware added user
    const { bookId, days = 14 } = req.body;

    // check book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies <= 0) return res.status(400).json({ message: 'Book out of stock' });

    // prevent duplicate active borrow
    const existing = await Borrow.findOne({ user: userId, book: bookId, status: 'borrowed' });
    if (existing) return res.status(400).json({ message: 'You already borrowed this book' });

    // create borrow record
    const dueAt = new Date(Date.now() + days * 24*60*60*1000);
    const borrow = new Borrow({ user: userId, book: bookId, dueAt });
    await borrow.save();

    // decrease availableCopies
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (err) {
    next(err);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
    if (borrow.user.toString() !== String(userId)) return res.status(403).json({ message: 'Not allowed' });
    if (borrow.status === 'returned') return res.status(400).json({ message: 'Already returned' });

    borrow.returnedAt = new Date();
    borrow.status = 'returned';
    await borrow.save();

    // increase book availableCopies
    await Book.findByIdAndUpdate(borrow.book, { $inc: { availableCopies: 1 } });

    res.json({ message: 'Returned successfully', borrow });
  } catch (err) {
    next(err);
  }
};

exports.getUserBorrows = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id;
    const borrows = await Borrow.find({ user: userId }).populate('book', 'title author').lean();
    res.json(borrows);
  } catch (err) {
    next(err);
  }
};
