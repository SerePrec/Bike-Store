import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import TypicButton from "../TypicButton";
import { priceFormat } from "../../utils/priceFormat";
import iconCart from "../../assets/img/icon_cart2.png";
import iconCheck from "../../assets/img/check.svg";
import "./MyAccountAlert.scss";

const MyAccountAlert = ({
  userName,
  isCartSaved,
  totQtyInCart,
  totPriceInCart,
  checkInRange
}) => {
  return (
    <Alert variant="info" className="myAccountAlert w-100">
      <Alert.Heading>
        HOLA, <span>{userName.toUpperCase()}</span>
      </Alert.Heading>
      <p>Nos alegra tenerte de vuelta por nuestra tienda.</p>
      {isCartSaved && (
        <>
          <hr />
          <p className="mb-0">
            ¡Encontramos un <b>carrito guardado</b> en tu dispositivo! Si deseas
            recuperarlo, deberás tener vacío tu carrito actual y dirgirte a él{" "}
            <TypicButton as={Link} to="/cart" size="sm" className="black">
              Ir al carrito
              <img src={iconCart} alt="" />
            </TypicButton>
          </p>
        </>
      )}
      {totQtyInCart > 0 &&
        (checkInRange ? (
          <>
            <hr />
            <p className="mb-0">
              Tienes un carrito activo con un total de{" "}
              <b>{totQtyInCart} productos</b> y un importe total de{" "}
              <b>${priceFormat(totPriceInCart)}</b>. Puedes confirmar y pagar tu
              compra desde aquí{" "}
              <TypicButton as={Link} to="/checkout" size="sm" className="black">
                Checkout
                <img src={iconCheck} alt="" />
              </TypicButton>
            </p>
          </>
        ) : (
          <>
            <hr />
            <p className="mb-0">
              Tienes un carrito activo que <b>necesita ser actualizado</b> con
              nuestra disponibilidad actual de productos. Ve a tu carrito para
              actualizarlo y poder continuar tu compra{" "}
              <TypicButton as={Link} to="/cart" size="sm">
                Actualizar carrito
                <img src={iconCart} alt="" />
              </TypicButton>
            </p>
          </>
        ))}
    </Alert>
  );
};

export default MyAccountAlert;
