import React from "react";
import CartDetail from "../../components/CartDetail";
import InfoBar from "../../components/InfoBar";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  return (
    <main>
      <InfoBar title="MI CARRITO DE COMPRA">
        <img src={iconCart} alt="Mi Carrito" />
      </InfoBar>
      <div className="container-xl cartDetailContainer">
        <CartDetail />
      </div>
    </main>
  );
};

export default Cart;
