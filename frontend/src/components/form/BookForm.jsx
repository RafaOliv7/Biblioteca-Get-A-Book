import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function BookForm({ handleSubmit, bookData, btnText }) {
  const [book, setBook] = useState(bookData || {});
  const [preview, setPreview] = useState([]);
  const categorys = [
    "Drama",
    "Ficção",
    "Ação",
    "Espiritualidade",
    "Desenvolvimento",
  ];

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setBook({ ...book, images: [...e.target.files] });
  }

  function handleChange(e) {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setBook({
      ...book,
      category: e.target.options[e.target.selectedIndex].text,
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log(book);
    handleSubmit(book);
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_book_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={book.name}
                key={`${book.title}+${index}`}
              />
            ))
          : book.images &&
            book.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_API}/images/Books/${image}`}
                alt={book.name}
                key={`${book.title}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do Livro"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Livro"
        type="text"
        name="title"
        placeholder="Digite o nome do livro"
        handleOnChange={handleChange}
        value={book.title || ""}
      />
      <Input
        text="Nome do Autor"
        type="text"
        name="author"
        placeholder="Digite o nome do autor"
        handleOnChange={handleChange}
        value={book.author || ""}
      />
      <Input
        text="Páginas"
        type="number"
        name="pages"
        placeholder="Quantidade de páginas"
        handleOnChange={handleChange}
        value={book.pages || ""}
      />
      <Input
        text="Linguagem"
        type="text"
        name="language"
        placeholder="Digite o Idioma do livro"
        handleOnChange={handleChange}
        value={book.language || ""}
      />
      <Select
        name="category"
        text="Selecione a categoria"
        options={categorys}
        handleOnChange={handleCategory}
        value={book.category || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default BookForm;
