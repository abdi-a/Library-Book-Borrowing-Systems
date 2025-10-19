const express = require("express");
const router = express.Router();
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require("../controllers/books.controller");

// RESTful routes
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
