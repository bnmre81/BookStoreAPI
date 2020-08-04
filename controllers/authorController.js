const slugify = require("slugify");
// Data
const { Author, Book } = require("../db/models");

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findByPk(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.authorList = async (req, res, next) => {
  try {
    const authors = await Author.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Book,
          as: "books",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

exports.authorUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.author.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorDelete = async (req, res, next) => {
  try {
    await req.author.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.bookCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.authorId = req.author.id;
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
