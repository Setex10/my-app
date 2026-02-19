'use client'
import { useState } from "react";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const host = window.location.origin;

    try {
      const response = await fetch(`${host}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const dataJson = await response.json();

      setMessage(dataJson.message);

      if (dataJson.status === 201) {
        window.location.href = `${host}/`;
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error");
    }
  };

  return (
      <form id="loginUser" onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Entrar</button>

        <p>{message}</p>

        <a href="/createAccount">Crear cuenta</a>
      </form>
  );
}
