import api from "../utils/api";

import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const cleanToken = token.replace(/^"(.*)"$/, "$1");
      api.defaults.headers.Authorization = `Bearer ${cleanToken}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgtype = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgtype = "error";
    }

    setFlashMessage(msgText, msgtype);
  }

  async function login(user) {
    let msgText = "Login realizado com sucesso";
    let msgtype = "success";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgtype = "error";
    }

    setFlashMessage(msgText, msgtype);
  }

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem("token", data.token);

    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    navigate("/");
  }

  function logout() {
    const msgText = "Logout realizado com sucesso!";
    const msgtype = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;

    navigate("/");

    setFlashMessage(msgText, msgtype);
  }

  return { authenticated, register, logout, login };
}
