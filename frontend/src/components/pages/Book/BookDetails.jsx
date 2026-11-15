import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./BookDetails.module.css";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api.get(`/books/${id}`).then((response) => {
      setBook(response.data.book);
    });
  }, [id]);

  // A funcionalidade de adotar o livro entra na próxima funcionalidade

  return (
    <>
      {book.title && (
        <section className={styles.book_details_container}>
          <div className={styles.bookdetails_header}>
            <h1>Você está vendo o livro: {book.title}</h1>
            <p>
              Se tiver interesse, entre em contato com o dono para mais
              informações
            </p>
          </div>
          <div className={styles.book_images}>
            {book.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_API}/images/books/${image}`}
                alt={book.title}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Categoria:</span> {book.category}
          </p>
          <p>
            <span className="bold">Autor:</span> {book.author}
          </p>
          <p>
            <span className="bold">Paginás:</span> {book.pages}
          </p>
        </section>
      )}
    </>
  );
};

export default BookDetails;
