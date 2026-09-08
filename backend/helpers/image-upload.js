const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("books")) {
      folder = "books";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + Math.floor(Math.random() * 100);

    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
      return cb(new Error("Por favor, envie apenas jpg ou png!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
