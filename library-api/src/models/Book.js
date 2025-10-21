const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  isbn: { type: String, unique: true, sparse: true },
  totalCopies: { type: Number, default: 1, min: 0 },
  availableCopies: { type: Number, default: 1, min: 0 },
  category: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
