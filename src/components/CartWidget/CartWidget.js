import React from "react";
import { Nav } from "react-bootstrap";
import iconCart from "../../assets/img/icon_cart.svg";
import "./CartWidget.scss";

const CartWidget = () => {
  return (
    <>
      <Nav.Link className="cartWidget" href="#carrito">
        <span className="itemsQuantity">0</span>
        <img src={iconCart} alt="Carrito" />
      </Nav.Link>
    </>
  );
};

export default CartWidget;
