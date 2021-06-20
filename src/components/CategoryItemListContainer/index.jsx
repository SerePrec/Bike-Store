import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemList from "../ItemList";
import "./CategoryItemListContainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const CategoryItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { catId } = useParams();

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
        productsFiltered = res.filter(elem => elem.category === catId);
        if (productsFiltered.length === 0) {
          return Promise.reject({
            title: "Categoría Inexistente o Sin Productos",
            msg1: "Por favor verifique la dirección de su enlace.",
            msg2: "Disculpe las molestias."
          });
        }
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
  }, [catId]);

  return (
    <div className={`container-xl categoryShowRoom ${isLoading && "loading"}`}>
      <div>
        <h3>{catId.toUpperCase()}</h3>
        {!isLoading && products && (
          <p className="categoryShowRoom__total">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </p>
        )}
      </div>
      <ItemList isLoading={isLoading} isError={isError} products={products} />
    </div>
  );
};

export default CategoryItemListContainer;
