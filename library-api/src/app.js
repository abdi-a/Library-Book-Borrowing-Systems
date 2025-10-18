const express = require("express");
const dotenv = require("dotenv");

// load environment variables
dotenv.config();

const app = express();

// allow JSON body parsing
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Library API is running 📚");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
