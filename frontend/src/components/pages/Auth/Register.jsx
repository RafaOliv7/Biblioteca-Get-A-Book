import { useState, useContext } from "react";

import Input from "../../form/Input";
import image from "../../../assets/img/image.avif";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

import { Context } from "../../../context/UserContext";

function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    register(user);
  }

  return (
    <section className={styles.form_container}>
      <div className={styles.image}>
        <img src={image} alt="" className={styles.img} />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Junte-se à nossa comunidade literária</h1>
        <Input
          text="Nome"
          type="Text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="Text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
        <p>
          Já tem conta? <Link to="/login">Clique Aqui.</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
