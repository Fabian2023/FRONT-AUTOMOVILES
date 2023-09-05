import React, { useState } from "react";
import style from "./LoginUsers.module.css";

const LoginUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica para enviar la información de inicio de sesión al servidor o realizar la autenticación.

    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Restablece los campos después de enviar el formulario
    setEmail("");
    setPassword("");
  };

  return (
    <div className={style.container}>
      <h3>Inicio de sesión de usuarios</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico*:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña*:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <a href="/SignUp">Regístrate</a></p>
    </div>
  );
};

export default LoginUsers;

