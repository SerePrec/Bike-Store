import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ItemList from "../ItemList";
import "./SearchItemListContainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const CategoryItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { search } = useLocation();

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
        let query = new URLSearchParams(search);
        let searchText = query.get("q").toLowerCase();
        productsFiltered = res.filter(
          elem => elem.title.toLowerCase().indexOf(searchText) !== -1
        );
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
  }, [search]);

  return (
    <div className={`container-xl searchShowRoom ${isLoading && "loading"}`}>
      <div>
        <h3>Su Búsqueda "{new URLSearchParams(search).get("q")}"</h3>
        {!isLoading && products && (
          <p className="searchSowRoom__total">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </p>
        )}
      </div>
      <ItemList isLoading={isLoading} isError={isError} products={products} />
    </div>
  );
};

export default CategoryItemListContainer;
