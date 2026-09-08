import api from "../../../utils/api";
import styles from "./AddBook.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../../form/BookForm";
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddBook() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerBook(book) {
    let msgType = "success";

    const formData = new FormData();

    Object.keys(book).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < book[key].length; i++) {
          formData.append("images", book[key][i]);
        }
      } else {
        formData.append(key, book[key]);
      }
    });

    const data = await api
      .post("books/create", formData, {
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

    if (msgType !== "error") {
      navigate("/");
    }
  }

  return (
    <section className={styles.addbook_header}>
      <div>
        <h1>Cadastre um Livro</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <BookForm handleSubmit={registerBook} btnText="Cadastrar" />
    </section>
  );
}

export default AddBook;
