import React, { useState } from "react";
import style from "./SingUp.module.css";
import axios from "axios";
import GoogleLogin from "react-google-login";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Agregamos el estado para la contraseña
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Validación de contraseña: al menos una letra y un número
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "El nombre completo es obligatorio";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/.test(fullName)) {
      newErrors.fullName =
        "Nombre completo contiene caracteres inválidos";
    } else if (fullName.length > 20) {
      newErrors.fullName =
        "El nombre completo debe tener 20 caracteres o menos";
    }

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!validateEmail(email)) {
      newErrors.email = "Formato de correo electrónico inválido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "La contraseña debe contener al menos una letra y un número y tener al menos 8 caracteres";
    }

    if (!province) {
      newErrors.province = "La provincia es obligatoria";
    }

    if (!city) {
      newErrors.city = "La ciudad es obligatoria";
    }

    if (!address) {
      newErrors.address = "La dirección es obligatoria";
    }

    if (!zipCode) {
      newErrors.zipCode = "El código postal es obligatorio";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        fullName,
        email,
        password, // Agregamos la contraseña al formulario
        province,
        city,
        address,
        zipCode,
      };

      axios
        .post("http://localhost:3001/users/user", formData)
        .then((response) => {
          console.log("Formulario enviado exitosamente");
          setFormSubmitted(true);

          // Limpia los campos después de 4 segundos
          setTimeout(() => {
            setFullName("");
            setEmail("");
            setPassword("");
            setProvince("");
            setCity("");
            setAddress("");
            setZipCode("");
            setFormSubmitted(false);
          }, 4000);
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
          setFormSubmitted(false);
        });
    } else {
      setFormSubmitted(false);
    }

    setErrors(newErrors);
  };

  const responseGoogle = (response) => {
    console.log(response); // Puedes acceder a la información del usuario en response.profileObj
    // Aquí puedes enviar la información de Google a tu servidor para registrarlo
    // Por ejemplo, podrías añadir una llamada a tu API para registrar al usuario con la información de Google aquí
  };

  const responseGoogleFailure = (error) => {
    console.error(error);
    // Maneja los errores de inicio de sesión de Google aquí
  };

  return (
    <div className={style.container}>
      <h3>Crea una cuenta</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Nombre completo*:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.fullName && <span className={style.error}>{errors.fullName}</span>}
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico*:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Contraseña*:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.password && <span className={style.error}>{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="province">Provincia*:</label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.province && <span className={style.error}>{errors.province}</span>}
        </div>
        <div>
          <label htmlFor="city">Ciudad*:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.city && <span className={style.error}>{errors.city}</span>}
        </div>
        <div>
          <label htmlFor="address">Dirección*:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.address && <span className={style.error}>{errors.address}</span>}
        </div>
        <div>
          <label htmlFor="zipCode">Código Postal*:</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            style={{ color: "black" }}
          />
          {errors.zipCode && <span className={style.error}>{errors.zipCode}</span>}
        </div>
        <GoogleLogin
          clientId="748160193030-39026upl2k64rlq6g75kdlv612lv64m0.apps.googleusercontent.com"
          buttonText="Iniciar sesión con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
        <button type="submit">Registrarse</button>
      </form>
      {formSubmitted && <p>Formulario enviado exitosamente</p>}
    </div>
  );
};

export default SignUp;
