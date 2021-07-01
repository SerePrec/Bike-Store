import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartDetail from "../../components/CartDetail";
import EmptyCart from "../../components/EmptyCart";
import InfoBar from "../../components/InfoBar";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  const { cart, clearCart, removeFromCart, updateFromCart } =
    useContext(CartContext);

  return (
    <main>
      <InfoBar title="MI CARRITO DE COMPRA">
        <img src={iconCart} alt="Mi Carrito" />
      </InfoBar>
      <div className="container-xl cartDetailContainer">
        {cart.length > 0 ? (
          <CartDetail
            cart={cart}
            clearCart={clearCart}
            removeFromCart={removeFromCart}
            updateFromCart={updateFromCart}
          />
        ) : (
          <EmptyCart />
        )}
      </div>
    </main>
  );
};

export default Cart;
