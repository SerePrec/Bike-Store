import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { searchQuery } from "../services/productsFilter";
import { getProducts, temp } from "../services/getProducts";

export const useSearch = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { catId } = useParams();
  let { search, pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/search") {
      setIsLoading(true);
      getProducts()
        .then(res => {
          let productsFiltered;
          let query = new URLSearchParams(search);
          let searchText = query.get("q").toLowerCase();
          productsFiltered = searchQuery(res, searchText);
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
    }
  }, [search, pathname]);

  useEffect(() => {
    if (pathname !== "/search") {
      setIsLoading(true);
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
    }
  }, [catId, pathname]);

  return {
    products,
    setProducts,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    catId,
    search,
    pathname
  };
};
