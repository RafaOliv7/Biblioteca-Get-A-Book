import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context/UserContext";

import styles from "./Home.module.css";

function Home() {
  const { authenticated } = useContext(Context);

  return (
    <section>
      <div className={styles.book_home_header}>
        <h1>Bem-vindo à Biblioteca</h1>
        {authenticated ? (
          <p>
            Você já pode <Link to="/book/add">cadastrar um livro</Link> na
            plataforma.
          </p>
        ) : (
          <p>
            <Link to="/register">Cadastre-se</Link> ou{" "}
            <Link to="/login">faça login</Link> para começar a cadastrar
            livros.
          </p>
        )}
      </div>
    </section>
  );
}

export default Home;
