import { Link } from "react-router-dom";
import { UseContext } from "react";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/Book.png";

import { Context } from "../../context/UserContext";
import { useContext } from "react";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Book" />
        <h2>Biblioteca</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/book/add">Cadastrar Livro</Link>
            </li>
            <li>
              <Link to="/book/mybooks">Meus Livros</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
