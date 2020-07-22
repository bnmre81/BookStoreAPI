let books = require("../books");
const slugify = require("slugify");

exports.bookCreate = (req, res) => {
  console.log(req);
  const id = books[books.length - 1].id + 1;
  const newBook = { ...req.body, id }; // id is equivalent to id: id
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.bookList = (req, res) => {
  res.json(books);
};

exports.bookUpdate = (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);
  if (foundBook) {
    for (const key in req.body) foundBook[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

exports.bookDelete = (req, res) => {
  const { bookId } = req.params;
  const foundBook = books.find((book) => book.id === +bookId);
  if (foundBook) {
    books = books.filter((_book) => _book !== foundBook);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "book not found" });
  }
};
