import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import TypicButton from "../TypicButton";
import iconCart from "../../assets/img/icon_cart2_red.png";
import "./EmptyCart.scss";

const EmptyCart = ({ getSavedCart, savedCart, loadSavedCart, isLoading }) => {
  useEffect(() => {
    getSavedCart();
  }, [getSavedCart]);

  if (isLoading)
    return (
      <Loader
        message={{
          title: "Recuperando tu carrito...",
          msg1: "y validando tu selección"
        }}
      />
    );

  return (
    <div className="emptyCart animate__fadeIn">
      {savedCart && (
        <div>
          <p>Encontramos un carrito guardado...</p>
          <TypicButton className="font-weight-bold" onClick={loadSavedCart}>
            Cargar Carrito
          </TypicButton>
        </div>
      )}
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
