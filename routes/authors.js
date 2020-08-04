const express = require("express");

// Controllers
const {
  authorCreate,
  authorList,
  authorDelete,
  authorUpdate,
  bookCreate,
  fetchAuthor,
} = require("../controllers/authorController");

// MiddleWare
const upload = require("../midleware/multer");

const router = express.Router();

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const error = new Error("Author Not found");
    error.status = 404;
    next(error);
  }
});
// author List
router.get("/", authorList);
// author Delete
router.delete("/:authorId", authorDelete);

// author Create
router.post("/", upload.single("image"), authorCreate);

// author Update
router.put("/:authorId", upload.single("image"), authorUpdate);

// Book Create
router.post("/:authorId/books", upload.single("image"), bookCreate);

module.exports = router;
