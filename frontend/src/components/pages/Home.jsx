import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((response) => {
      setBooks(response.data.books);
    });
  }, []);

  return (
    <section>
      <div className={styles.book_home_header}>
        <h1>Adquira um Livro</h1>
        <p>Veja o detalhes de cada um e conheça o dono deles</p>
      </div>
      <div className={styles.book_container}>
        {books.length > 0 &&
          books.map((book) => (
            <div className={styles.book_card}>
              <div
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_API}/images/books/${book.images[0]})`,
                }}
                className={styles.book_card_image}
              ></div>
              <h3>{book.title}</h3>
              <p>
                <span className="bold">Categoria:</span> {book.category}
              </p>
              {book.available ? (
                <Link to={`book/${book._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Indisponível</p>
              )}
            </div>
          ))}
        {books.length === 0 && (
          <p>Não há livros cadastrados ou disponíveis no momento!</p>
        )}
      </div>
    </section>
  );
}

export default Home;
