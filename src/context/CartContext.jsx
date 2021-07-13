import React, { useState, useEffect } from "react";
export const CartContext = React.createContext([]);

const CartContextProvider = ({ children, defaultValue = [] }) => {
  const [cart, setCart] = useState(() => {
    const sessionCart =
      sessionStorage.getItem("myMammothCart") &&
      JSON.parse(sessionStorage.getItem("myMammothCart"));
    //verifico que exista y sea de un formato válido
    if (
      sessionCart &&
      sessionCart.length > 0 &&
      sessionCart[0].product &&
      sessionCart[0].qty
    ) {
      return sessionCart;
    } else {
      return defaultValue;
    }
  });

  const totQtyInCart = cart.reduce((total, elem) => total + elem.qty, 0);

  const totPriceInCart = cart.reduce(
    (total, elem) =>
      total + elem.product.price * (1 - elem.product.discount / 100) * elem.qty,
    0
  );

  const checkInRange = !cart.some(elem => elem.qty > elem.product.stock);

  const checkCartLength = () => {
    if (cart.length < 10) return true;
    return false;
  };

  const getFromCart = id => {
    return cart.find(elem => elem.product.id === id);
  };

  const isInCart = id => {
    return id === undefined ? undefined : getFromCart(id) !== undefined;
  };

  const addToCart = itemToAdd => {
    //agrega los productos al carrito y los agrupa si son del mismo tipo. También verifica que sea consistente con el stock
    const { product, qty } = itemToAdd;
    let matchedProduct = getFromCart(product.id);
    if (matchedProduct) {
      // si ya existía el producto en el carrito, y el stock es suficiente le suma la cantidad ingresada
      if (matchedProduct.qty + qty > product.stock) {
        return product.stock - (matchedProduct.qty + qty);
      }
      let updatedItem = {
        ...matchedProduct,
        qty: matchedProduct.qty + qty
      };
      let updatedCart = cart.map(elem =>
        elem.product.id === product.id ? updatedItem : elem
      );
      setCart(updatedCart);
    } else {
      // sino, agrega el item completo
      setCart(cart => [...cart, itemToAdd]);
    }
    return qty;
  };

  const updateFromCart = (id, qty) => {
    let updatedCart = cart.map(elem =>
      elem.product.id === id ? { ...elem, qty } : elem
    );
    setCart(updatedCart);
  };

  const removeFromCart = id => {
    let updatedCart = cart.filter(elem => elem.product.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveCartInSessionStorage = cart => {
    const JSONCart = JSON.stringify(cart);
    sessionStorage.setItem("myMammothCart", JSONCart);
  };

  const saveCartInLocalStorage = () => {
    const JSONCart = JSON.stringify(cart);
    localStorage.setItem("myMammothSavedCart", JSONCart);
  };

  useEffect(() => {
    saveCartInSessionStorage(cart);
    //console.log("Mi Carrito", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totQtyInCart,
        totPriceInCart,
        checkInRange,
        checkCartLength,
        isInCart,
        getFromCart,
        addToCart,
        updateFromCart,
        removeFromCart,
        clearCart,
        saveCartInLocalStorage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
