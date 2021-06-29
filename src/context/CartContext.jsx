import React, { useState } from "react";

export const CartContext = React.createContext([]);

const CartContextProvider = ({ children, defaultValue = [] }) => {
  const [cart, setCart] = useState(defaultValue);

  const addToCart = itemToAdd => {
    //agrega los productos al carrito y los agrupa si son del mismo tipo. También verifica que sea consistente con el stock
    console.log(cart, itemToAdd);
    let matchedProduct = cart.find(
      elem => elem.product.id === itemToAdd.product.id
    );
    if (matchedProduct) {
      // si ya existía el producto en el carrito, y el stock es suficiente le suma la cantidad ingresada
      if (matchedProduct.qty + itemToAdd.qty > itemToAdd.product.stock) {
        return itemToAdd.product.stock - (matchedProduct.qty + itemToAdd.qty);
      }
      let updatedItem = {
        ...matchedProduct,
        qty: matchedProduct.qty + itemToAdd.qty
      };
      let updatedCart = cart.map(elem =>
        elem.product.id === itemToAdd.product.id ? updatedItem : elem
      );
      setCart(updatedCart);
    } else {
      // sino, agrega el item completo
      setCart(cart => [...cart, itemToAdd]);
      return itemToAdd.qty;
    }
  };

  // function agregarCarrito(prodId, cant) {
  //   let producto = productos.find(prod => prod.id == prodId);
  //   producto.vender(cant);
  //   let coincidencia = carritoUsuario.miSeleccion.find(
  //     item => item.id == prodId
  //   );
  //   if (coincidencia) {
  //     // si ya existía el producto en el carrito, le suma la cantidad ingresada
  //     coincidencia.cant += cant;
  //   } else {
  //     // sino, agrega el item completo
  //     const miItem = new ItemCarrito(producto, cant);
  //     carritoUsuario.miSeleccion.push(miItem);
  //   }

  //   let mensajeEmergente = `Agregado: ${producto.descripcion}<br>Cantidad: ${cant} unidades.`;
  //   mostrarEmergente(mensajeEmergente, 4000); // genero mensaje normal por 4 segundos

  //   console.log(
  //     "%cComprando",
  //     "color: white; background-color: green; padding: 3px",
  //     producto.descripcion,
  //     "// Cant:",
  //     cant
  //   ); // simulando un control interno de la operación

  //   // hago las actualizaciones correspondientes
  //   animarIconoCarritoIn();
  //   actualizarCarritoEnStorage();
  //   actualizarInfoTarjetas();
  // }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
