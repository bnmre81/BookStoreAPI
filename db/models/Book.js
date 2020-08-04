const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Book extends Model {}

Book.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Book, {
  source: ["name"],
});

module.exports = Book;
