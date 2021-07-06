import React, { useState, useEffect } from "react";

export const CartContext = React.createContext([]);

const CartContextProvider = ({ children, defaultValue = [] }) => {
  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("myCart") &&
      JSON.parse(localStorage.getItem("myCart"));
    //verifico que exista y sea de un formato válido
    if (
      savedCart &&
      savedCart.length > 0 &&
      savedCart[0].product &&
      savedCart[0].qty
    ) {
      return savedCart;
    } else {
      return defaultValue;
    }
  });

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

  const saveCartInStorage = cart => {
    const JSONCart = JSON.stringify(cart);
    localStorage.setItem("myCart", JSONCart);
  };

  useEffect(() => {
    saveCartInStorage(cart);
    console.log("Mi Carrito", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        getFromCart,
        addToCart,
        updateFromCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
