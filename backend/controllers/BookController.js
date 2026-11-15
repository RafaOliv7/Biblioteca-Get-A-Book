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

  static async getAll(req, res) {
    const books = await Book.find().sort("-createdAt");

    res.status(200).json({
      books: books,
    });
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

  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const userId = user._id || user.id;

    const books = await Book.find({ "adopter._id": userId }).sort("-createdAt");

    res.status(200).json({
      books,
    });
  }

  static async getBookById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    res.status(200).json({
      book: book,
    });
  }

  static async removeBookById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (book.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Livro removido com sucesso!" });
  }

  static async updateBook(req, res) {
    const id = req.params.id;

    const { title, author, pages, category, language, available } =
      req.body || {};

    const images = req.files;

    const updatedData = {};

    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (book.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    if (!title) {
      res.status(422).json({ message: "O título é obrigatório!" });
      return;
    } else {
      updatedData.title = title;
    }

    if (!author) {
      res.status(422).json({ message: "O autor é obrigatório!" });
      return;
    } else {
      updatedData.author = author;
    }

    if (!pages) {
      res
        .status(422)
        .json({ message: "A quantidade de páginas é obrigátória!" });
      return;
    } else {
      updatedData.pages = pages;
    }

    if (!category) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    } else {
      updatedData.category = category;
    }

    if (!language) {
      res.status(422).json({ message: "A linguagem é obrigatória!" });
      return;
    } else {
      updatedData.language = language;
    }

    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Book.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Livro atualizado com sucesso!" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (book.user._id.toString() === user._id.toString()) {
      res.status(422).json({
        message: "Você não pode adotar seu próprio livro",
      });
      return;
    }

    if (book.adopter) {
      if (book.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já solicitou a adoção desse livro",
        });
        return;
      }
    }

    book.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Book.findByIdAndUpdate(id, book);

    res.status(200).json({
      message: `A adoção foi agendada com sucesso!, entre em contato com ${book.user.name} pelo telefone ${book.user.phone}`,
    });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (book.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    book.available = false;

    await Book.findByIdAndUpdate(id, book);

    res.status(200).json({
      message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!",
    });
  }
};
