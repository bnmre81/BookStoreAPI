const express = require("express");
const router = express.Router();
const {
  bookCreate,
  bookList,
  bookDelete,
  bookUpdate,
} = require("../controllers/bookControler");

router.get("/", bookList);

router.delete("/:bookId", bookDelete);

router.post("/", bookCreate);

router.put("/:bookId", bookUpdate);

module.exports = router;
