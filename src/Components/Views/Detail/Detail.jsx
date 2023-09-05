import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { getDetail } from "../../../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";
//import {gapi} from"gapi-script"
//import GoogleLogin from "react-google-login"

const Detail = () => {
  const { idCar } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Estado para mostrar el mensaje

  useEffect(() => {
    dispatch(getDetail(idCar));
  }, []);

  const carsDetail = useSelector((state) => state.carsDetail);
  if (!carsDetail) {
    return <div>...Loading</div>;
  }

  const { id, name, image, brand, description, price, stock, model } =
    carsDetail;

  const handleBuyClick = () => {
    const isAuthenticated = false; // Cambia esto según tu lógica de autenticación

    if (!isAuthenticated) {
      // Si el usuario no está autenticado, muestra el mensaje y programa su desaparición
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
        navigate("/LoginUsers"); // Redirige después de 3 segundos
      }, 4000); // 3000 milisegundos = 3 segundos
    } else {
      // Si el usuario está autenticado, realiza la acción de compra
      // Agrega tu lógica de compra aquí
      navigate("/LoginUsers"); // Redirige directamente si está autenticado
    }
  };

  //const ClientId = "748160193030-39026upl2k64rlq6g75kdlv612lv64m0.apps.googleusercontent.com"

  return (
    <div className={style.container}>
      <div className={style.img}>
        <img src={image} alt={name} />
      </div>
      <div className={style.info}>
        <h2>{name}</h2>
        <p>Marca: {brand}</p>
        <p>{description}</p>
        <p>Precio: {price}</p>
        <p>Stock: {stock}</p>
        <p>Año: {model}</p>
        <button className={style.button} onClick={handleBuyClick}>
          Comprar
        </button>
        {showLoginMessage && ( // Muestra el mensaje si showLoginMessage es verdadero
          <p className={style.loginMessage}>Por favor, inicia sesión para comprar.</p>
        )}
      </div>
      <div className={style.btnOut}>
        <NavLink to="/home">
          <button>x</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Detail;
