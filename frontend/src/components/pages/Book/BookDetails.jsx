import api from "../../../utils/api";

import { useState, useEffect, use } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./BookDetails.module.css";

import useFlashMessage from "../../../hooks/useFlashMessage";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/books/${id}`).then((response) => {
      setBook(response.data.book);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(`books/schedule/${book._id}`, {
        Authorization: `Bearer ${token}`,
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
          {token ? (
            <button onClick={schedule}>Adquirir</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              entrar em contato com o dono
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default BookDetails;
