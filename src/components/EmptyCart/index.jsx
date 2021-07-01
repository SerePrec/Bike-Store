import React from "react";
import { Link } from "react-router-dom";
import iconCart from "../../assets/img/icon_cart2_red.png";
import "./EmptyCart.scss";

const EmptyCart = () => {
  return (
    <div className="emptyCart animate__fadeIn">
      <img src={iconCart} alt="Carrito vacío" />
      <h2>¡TU CARRITO ESTÁ VACÍO!</h2>
      <p>Aún no has añadido productos para tu compra</p>
      <h4>Continuá eligiendo productos desde aquí:</h4>
      <div>
        <Link to="/">Seguir Navegando</Link>
      </div>
    </div>
  );
};

export default EmptyCart;
