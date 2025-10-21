const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// connect DB
connectDB();

// your routes...

// basic route
app.get("/", (req, res) => {
  res.send("Library API is running 📚");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
