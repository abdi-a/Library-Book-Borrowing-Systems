const express = require("express");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/books.routes");
// load environment variables
dotenv.config();

const app = express();

// allow JSON body parsing
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Library API is running 📚");
});

// connect book routes
app.use("/api/books", bookRoutes);
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
