'use client'
import { useState } from "react";
import "./createAccount.css";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({...formData, role: "admin"}),
      });

      const dataJson = await response.json();

      let fullMessage = dataJson.message || "";

      if (dataJson.detalles) {
        fullMessage += " " + dataJson.detalles.join(" ");
      }

      setMessage(fullMessage);

      if (dataJson.status === 201) {
        window.location.href = `http://localhost:3000/`;
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error");
    }
  };

  return (
    <form id="loginUser" onSubmit={handleSubmit}>
           <label>
        Rol
        <select>
          <option value={""}>selecciona un Rol</option>
          <option value={"inventario"}>Gestionador de Inventario</option>
         <option value={"ventas"}>ventas</option>
          <option value={"admin"}>Admin</option>
        </select>
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </label>

      <label>
        Usuario
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Entrar</button>

      <p>{message}</p>

      <a href="/login">Iniciar Sesion</a>
      
    </form>
  );
}
