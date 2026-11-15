import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

import RoundedImage from "../../Layouts/RoundedImage";

const MyAdoptions = () => {
  const [books, setBooks] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/books/myadoptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.books);
        console.log(books);
      });
  }, token);

  return (
    <section className={styles.booklist_header}>
      <div>
        <h1>Minhas Adoções</h1>
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
                <div className={styles.contacts}>
                  <p>
                    <span className="bold">Ligue para: </span> {book.user.phone}
                  </p>
                  <p>
                    <span className="bold">Fale com: </span> {book.user.name}
                  </p>
                </div>
                <div className={styles.actions}>
                  {book.available ? (
                    <p>Adoção em processo</p>
                  ) : (
                    <p>Parabéns por concluir a adoção</p>
                  )}
                </div>
              </div>
            ))}
          {books.length === 0 && <p>Ainda não há adoções de Livros.</p>}
        </div>
      </div>
    </section>
  );
};

export default MyAdoptions;
