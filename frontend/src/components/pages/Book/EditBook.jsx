import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./AddBook.module.css";

import BookForm from "../../form/BookForm";

import useFlashMessage from "../../../hooks/useFlashMessage";

function EditBook() {
  const [book, setBook] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/books/${id}`, {
        Authorization: `Bearer ${token}`,
      })
      .then((response) => {
        setBook(response.data.book);
      });
  }, [token, id]);

  async function updateBook(book) {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(book).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < book[key].length; i++) {
          formData.append("images", book[key][i]);
        }
      } else {
        formData.append(key, book[key]);
      }
    });

    const data = await api
      .patch(`books/${book._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section className={styles.addbook_header}>
      <div>
        <h1>Editando o Livro: {book.title}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {book.title && (
        <BookForm
          handleSubmit={updateBook}
          btnText="Atualizar"
          bookData={book}
        />
      )}
    </section>
  );
}

export default EditBook;
