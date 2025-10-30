// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);

// Connect to DB
connectDB();

module.exports = app;
