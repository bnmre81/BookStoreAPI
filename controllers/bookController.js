const slugify = require("slugify");
// Data
let books = require("../books");
const { Book, Author } = require("../db/models");

exports.fetchBook = async (bookId, next) => {
  try {
    const book = await Book.findByPk(bookId);
    return book;
  } catch {
    next(error);
  }
};

exports.bookList = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: { exclude: ["authorId", "createdAt", "updatedAt"] },
      include: {
        model: Author,
        as: "author",
        attributes: ["name"],
      },
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.bookUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.book.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.bookDelete = async (req, res, next) => {
  try {
    await req.book.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
