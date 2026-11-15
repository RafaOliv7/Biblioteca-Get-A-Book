import api from "../../../utils/api";

import styles from "./Dashboard.module.css";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import RoundedImage from "../../Layouts/RoundedImage";

import useFlashMessage from "../../../hooks/useFlashMessage";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/books/mybooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.books);
      });
  }, [token]);

  async function removeBook(id) {
    let msgType = "success";

    const data = await api
      .delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeAdoption(id) {
    let msgType = "success";

    const data = await api
      .patch(`/books/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    <section>
      <div className={styles.booklist_header}>
        <h1>MyBooks</h1>
        <Link to="/book/add">Cadastrar Livros</Link>
      </div>
      <div className={styles.booklist_container}>
        {books.length > 0 &&
          books.map((book) => (
            <div className={styles.booklist_row} key={book._id}>
              <RoundedImage
                src={`${import.meta.env.VITE_API}/images/books/${book.images[0]}`}
                alt={book.title}
                width="px75"
              />
              <span className="bold">{book.title}</span>
              <div className={styles.actions}>
                {book.available ? (
                  <>
                    {book.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(book._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/book/edit/${book._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removeBook(book._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Book já adotado</p>
                )}
              </div>
            </div>
          ))}
        {books.length === 0 && <p>Não há Livros cadastrados</p>}
      </div>
    </section>
  );
}

export default MyBooks;
