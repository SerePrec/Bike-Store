import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import TypicButton from "../TypicButton";
import { getProducts } from "../../utils/getProducts";
import iconCart from "../../assets/img/icon_cart2_red.png";
import "./EmptyCart.scss";

const EmptyCart = ({ setCart }) => {
  const [savedCart, setSavedCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [isError, setIsError] = useState(false);

  const getSavedCart = () => {
    const localCart =
      localStorage.getItem("myMammothSavedCart") &&
      JSON.parse(localStorage.getItem("myMammothSavedCart"));
    //verifico que exista y sea de un formato válido
    if (
      localCart &&
      localCart.length > 0 &&
      localCart[0].product &&
      localCart[0].qty
    ) {
      setSavedCart(localCart);
      return true;
    } else {
      setSavedCart(null);
      return false;
    }
  };

  const loadSavedCart = () => {
    setIsLoading(true);
    const dataSavedCart = savedCart.map(elem => {
      return { id: elem.product.id, qty: elem.qty };
    });
    return getProducts()
      .then(res => {
        const checkedCart = [];
        res.forEach(product => {
          for (const data of dataSavedCart) {
            if (product.id === data.id && product.stock >= data.qty) {
              const qty = data.qty;
              checkedCart.push({ product, qty });
            }
          }
        });
        setCart(checkedCart);
        localStorage.removeItem("myMammothSavedCart");
        return Promise.resolve({
          savedCartLength: savedCart.length,
          checkedCartLength: checkedCart.length
        });
      })
      .catch(err => {
        setCart(null);
        //setIsError(err);
        //setIsLoading(false);
      });
  };

  const handleLoad = () => {
    loadSavedCart().then(res => console.log(res));
  };

  useEffect(() => {
    getSavedCart();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          message={{
            title: "Recuperando tu carrito...",
            msg1: "y validando tu selección"
          }}
        />
      ) : (
        <div className="emptyCart animate__fadeIn">
          {savedCart && (
            <div>
              <p>Encontramos un carrito guardado...</p>
              <TypicButton className="font-weight-bold" onClick={handleLoad}>
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
      )}
    </>
  );
};

export default EmptyCart;
