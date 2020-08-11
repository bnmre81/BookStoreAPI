const bcrypt = require("bcrypt");

// Database
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json((message: "user creatd successfully!"));
  } catch (error) {
    next(error);
  }
};
