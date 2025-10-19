// temporary in-memory data
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];

// GET all books
exports.getBooks = (req, res) => {
  res.json(books);
};

// GET single book by ID
exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

// ADD a new book
exports.addBook = (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
};

// UPDATE book
exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
};

// DELETE book
exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((b) => b.id !== id);
  res.json({ message: "Book deleted successfully" });
};
