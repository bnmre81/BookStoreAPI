const Author = require("./Authors");
const Book = require("./Book");

// An Author can many books
Author.hasMany(Book, { as: "books", foreignKey: "authorId", allowNull: false });

Book.belongsTo(Author, { as: "author" });

module.exports = {
  Book,
  Author,
};
