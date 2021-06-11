import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import Loader from "../Loader";
import "./itemListcontainer.scss";

const ItemListContainer = ({ greeting, legend }) => {
  const [productsHome, setProductsHome] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let temp;
    const getProducts = fetch("/productos.json")
      .then(res => {
        return res.json();
      })
      .catch(
        err =>
          new Promise((resolve, reject) => {
            temp = setTimeout(() => {
              reject("Error De Carga");
            }, 2000);
          })
      )
      .then(
        data =>
          new Promise(resolve => {
            temp = setTimeout(() => {
              resolve(data);
            }, 2000);
          })
      );

    getProducts
      .then(res => {
        setProductsHome(res);
        setIsError(false);
      })
      .catch(err => {
        setProductsHome(null);
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
    <div className={`container-xl homeHighlights ${isLoading && "loaded"}`}>
      <div>
        <h2>{greeting}</h2>
        <p>{legend}</p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 homeProductsContainer">
        {isLoading && <Loader message={{ title: "Cargando..." }} />}
        {isError && (
          <Loader
            message={{
              title: isError,
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            }}
          />
        )}
        {productsHome && <ItemList products={productsHome} />}
      </div>
    </div>
  );
};

export default ItemListContainer;
