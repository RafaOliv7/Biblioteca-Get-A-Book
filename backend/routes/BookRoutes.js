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
router.get("/mybooks", verifyToken, BookController.getAllUserBooks);

module.exports = router;
