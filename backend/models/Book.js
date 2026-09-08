const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Book = mongoose.model(
  "Book",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      pages: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      available: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true },
  ),
);

module.exports = Book;
