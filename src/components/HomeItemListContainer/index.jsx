import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import "./HomeItemListContainer.scss";

//TODO:
import productsServer from "../../utils/productos.json";

const HomeItemListContainer = ({ greeting, legend }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let temp;
    setIsLoading(true);
    const getProducts = () =>
      new Promise((resolve, reject) => {
        temp = setTimeout(() => {
          resolve(productsServer);
          // reject({
          //   title: "Error de Carga",
          //   msg1: "Intenta recargar la página o regresa más tarde.",
          //   msg2: "Disculpe las molestias."
          // });
        }, 2000);
      });
    getProducts()
      .then(res => {
        let productsFiltered;
        productsFiltered = res.filter(elem => elem.home === true);
        setProducts(productsFiltered);
        setIsError(false);
      })
      .catch(err => {
        setProducts(null);
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      clearInterval(temp);
    };
  }, []);

  return (
    <div className={`container-xl highlights ${isLoading ? "loading" : ""}`}>
      <div>
        {greeting && <h2>{greeting}</h2>}
        {legend && <p>{legend}</p>}
      </div>
      <ItemList isLoading={isLoading} isError={isError} products={products} />
    </div>
  );
};

export default HomeItemListContainer;
