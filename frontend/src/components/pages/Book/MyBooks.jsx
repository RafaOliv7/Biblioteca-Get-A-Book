import api from "../../../utils/api";

import styles from "./Dashboard.module.css";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import RoundedImage from "../../Layouts/RoundedImage";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

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

  // Editar, Excluir e status de adoção entram nas próximas funcionalidades

  return (
    <section>
      <div className={styles.booklist_header}>
        <h1>Meus Livros</h1>
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
              <span>{book.author}</span>
              <span>{book.category}</span>
            </div>
          ))}
        {books.length === 0 && <p>Não há Livros cadastrados</p>}
      </div>
    </section>
  );
}

export default MyBooks;
