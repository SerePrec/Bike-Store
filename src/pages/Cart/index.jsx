import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartDetail from "../../components/CartDetail";
import EmptyCart from "../../components/EmptyCart";
import InfoBar from "../../components/InfoBar";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cart, setCart } = cartContext;
  return (
    <main>
      <InfoBar title="MI CARRITO DE COMPRA">
        <img src={iconCart} alt="Mi Carrito" />
      </InfoBar>
      <div className="container-xl cartDetailContainer">
        {cart.length > 0 ? (
          <CartDetail {...cartContext} />
        ) : (
          <EmptyCart setCart={setCart} />
        )}
      </div>
    </main>
  );
};

export default Cart;
