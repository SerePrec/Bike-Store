import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemList from "../ItemList";
import Loader from "../Loader";
import "./itemListcontainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const ItemListContainer = ({ greeting, legend, home }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { catId } = useParams();

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
        let productstFiltered;
        if (home) {
          productstFiltered = res.filter(elem => elem.home === true);
        } else {
          productstFiltered = res.filter(elem => elem.category === catId);
        }
        setProducts(productstFiltered);
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
  }, [catId, home]);

  return (
    <div className={`container-xl homeHighlights ${isLoading && "loading"}`}>
      <div>
        {greeting && <h2>{greeting}</h2>}
        {legend && <p>{legend}</p>}
        {catId && <h3 className="text-left w-100">{catId.toUpperCase()}</h3>}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 homeProductsContainer">
        {isLoading && <Loader message={{ title: "Cargando..." }} />}
        {!isLoading && isError && (
          <Loader
            message={{
              title: isError,
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            }}
          />
        )}
        {!isLoading && products && <ItemList products={products} />}
      </div>
    </div>
  );
};

export default ItemListContainer;
