const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Book } = require("./db/models");
const passport = require("passport");
// Strategies
const { localStrategy } = require("./midleware/passport");

const db = require("./db");

// Routes
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const userRoutes = require("./routes/users");

// Create an Express App Instance
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize);
passport.use(localStrategy);

// Routers
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

// Not found paths => MiddleWare
app.use((req, res, next) => {
  const error = new Error("Path Not found");
  error.status = 404;
  next(error);
});

// Error Handling MiddleWare
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

console.log("directory name", path.join(__dirname, "media"));

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("run -> error", error);
  }
};

run();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
