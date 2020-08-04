const express = require("express");

// Controllers
const {
  bookList,
  bookDelete,
  bookUpdate,
  fetchBook,
} = require("../controllers/bookController");

// MiddleWare
const upload = require("../midleware/multer");

const router = express.Router();

router.param("bookId", async (req, res, next, bookId) => {
  const book = await fetchBook(bookId, next);
  if (book) {
    req.book = book;
    next();
  } else {
    const error = new Error("Book Not found");
    error.status = 404;
    next(error);
  }
});
// Book List
router.get("/", bookList);
// Book Delete
router.delete("/:bookId", bookDelete);

// Book Update
router.put("/:bookId", upload.single("image"), bookUpdate);

module.exports = router;
