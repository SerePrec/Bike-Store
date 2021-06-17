import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemList from "../ItemList";
import Loader from "../Loader";
import "./itemListcontainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const ItemListContainer = ({ categories, home, greeting, legend }) => {
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
          // reject({
          //   title: "Error de Carga",
          //   msg1: "Intenta recargar la página o regresa más tarde.",
          //   msg2: "Disculpe las molestias."
          // });
        }, 2000);
      });
    getProducts()
      .then(res => {
        let productstFiltered;
        if (home) {
          productstFiltered = res.filter(elem => elem.home === true);
        } else {
          productstFiltered = res.filter(elem => elem.category === catId);
          if (productstFiltered.length === 0) {
            return Promise.reject({
              title: "Categoría Inexistente o Sin Productos",
              msg1: "Por favor verifique la dirección de su enlace.",
              msg2: "Disculpe las molestias."
            });
          }
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
    <div className={`container-xl showRoom ${isLoading && "loading"}`}>
      <div>
        {greeting && <h2>{greeting}</h2>}
        {legend && <p>{legend}</p>}
        {catId && <h3 className="showRoom__category">{catId.toUpperCase()}</h3>}
        {!isLoading && products && (
          <p className="showRoom__total">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </p>
        )}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 productsContainer">
        {isLoading && <Loader message={{ title: "Cargando..." }} />}
        {!isLoading && isError && <Loader message={isError} />}
        {!isLoading && products && <ItemList products={products} />}
      </div>
    </div>
  );
};

export default ItemListContainer;
