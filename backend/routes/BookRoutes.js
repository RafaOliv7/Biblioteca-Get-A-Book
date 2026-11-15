const router = require("express").Router();

const BookController = require("../controllers/BookController.js");

const verifyToken = require("../helpers/verify-token.js");
const { imageUpload } = require("../helpers/image-upload.js");
const { verify } = require("jsonwebtoken");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  BookController.create,
);
router.get("/", BookController.getAll);
router.get("/mybooks", verifyToken, BookController.getAllUserBooks);
router.get("/myadoptions", verifyToken, BookController.getAllUserAdoptions);
router.get("/:id", BookController.getBookById);
router.delete("/:id", verifyToken, BookController.removeBookById);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  BookController.updateBook,
);
router.patch("/schedule/:id", verifyToken, BookController.schedule);
router.patch("/conclude/:id", verifyToken, BookController.concludeAdoption);

module.exports = router;
