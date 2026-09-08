const Book = require("../models/Book");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class BookController {
  static async create(req, res) {
    const { title, author, pages, category, language } = req.body || {};

    const images = req.files;

    const available = true;

    if (!title) {
      res.status(422).json({ message: "O título é obrigatório!" });
      return;
    }

    if (!author) {
      res.status(422).json({ message: "O autor é obrigatório!" });
      return;
    }

    if (!pages) {
      res
        .status(422)
        .json({ message: "A quantidade de páginas é obrigátória!" });
      return;
    }

    if (!category) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    }

    if (!language) {
      res.status(422).json({ message: "A linguagem é obrigatória!" });
      return;
    }

    if (!images) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const book = new Book({
      title,
      author,
      pages,
      category,
      language,
      available,
      images: [],
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      book.images.push(image.filename);
    });

    try {
      const newBook = await book.save();
      res.status(201).json({
        message: "Livro cadastrado com sucesso!",
        newBook,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAllUserBooks(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const userId = (user._id || user.id).toString();

    const books = await Book.find({ "user._id": userId }).sort("-createdAt");

    res.status(200).json({
      books,
    });
  }
};
