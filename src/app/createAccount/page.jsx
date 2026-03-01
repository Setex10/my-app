'use client'
import { useState } from "react";
import "./createAccount.css";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    enterprise: ""
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
      const response = await fetch(`https://my-app-7usk.onrender.com/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const dataJson = await response.json();

      let fullMessage = dataJson.message || "";

      if (dataJson.detalles) {
        fullMessage += " " + dataJson.detalles.join(" ");
      }

      setMessage(fullMessage);

      if (dataJson.status === 201) {
        window.location.href = `https://my-app-7usk.onrender.com/`;
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error");
    }
  };

  const onChangeSelect = (event) => {
    const value = event.target.value
    setFormData((prevValue) => {
      return {
        ...prevValue,
        role: value
      }
    })
  }



  return (
    <form id="loginUser" onSubmit={handleSubmit}>
           <label>
        Rol
        <select onChange={onChangeSelect}>
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

      {formData.role != "admin" ? <label>
        Id de la empresa "pedir esta información al administrador"
        <input type="text" value={formData.enterprise} onChange={handleChange}
        required
        name="enterprise"
        />
      </label> : <label>
        Nombre de la empresa a crear
        <input type="text" name="enterprise" value={formData.enterprise} onChange={handleChange}/>
        </label>}

      <button type="submit">Entrar</button>

      <p>{message}</p>

      <a href="/login">Iniciar Sesion</a>
      
    </form>
  );
}
