const Author = require("./Authors");
const Book = require("./Book");
const User = require("./User");

// An Author can have many books
Author.hasMany(Book, { as: "books", foreignKey: "authorId", allowNull: false });

Book.belongsTo(Author, { as: "author" });

module.exports = {
  Book,
  Author,
};

module.exports = {
  Bakery,
  Cookie,
  User,
};
