const express = require("express");
const cors = require("cors");
let books = require("./books");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.delete("/books/:bookId", (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);
  if (foundBook) {
    books = books.filter((_book) => _book !== foundBook);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

app.post("/books", (req, res) => {
  console.log(req);
  const id = books[books.length - 1].id + 1;
  const newBook = { ...req.body, id }; // id is equivalent to id: id
  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
