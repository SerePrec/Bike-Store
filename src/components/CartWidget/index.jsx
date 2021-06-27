import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import iconCart from "../../assets/img/icon_cart.svg";
import "./CartWidget.scss";

const CartWidget = () => {
  return (
    <>
      <Nav.Link as={Link} to={`/cart`} className="cartWidget">
        <span className="itemsQuantity">0</span>
        <img src={iconCart} alt="Carrito" />
      </Nav.Link>
    </>
  );
};

export default CartWidget;
