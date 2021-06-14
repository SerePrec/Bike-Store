import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import Loader from "../Loader";
import "./itemListcontainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const ItemListContainer = ({ greeting, legend }) => {
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
          //reject("Error de Carga");
        }, 2000);
      });
    getProducts()
      .then(res => {
        setProducts(res);
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
    <div className={`container-xl homeHighlights ${isLoading && "loading"}`}>
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
        {products && <ItemList products={products} />}
      </div>
    </div>
  );
};

export default ItemListContainer;
