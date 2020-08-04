const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Author extends Model {}

// change the file name to singular

Author.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Author, {
  source: ["name"],
});

module.exports = Author;
