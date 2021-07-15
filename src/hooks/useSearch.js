import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { SearchesContext } from "../context/SearchesContext";
import { searchQuery } from "../utils/productsFilter";
import { getFirestore } from "../firebase";

export const useSearch = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { getSearch, addSearch } = useContext(SearchesContext);
  let { catId } = useParams();
  let { search, pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/search") {
      const getProdFiltered = allProducts => {
        let query = new URLSearchParams(search);
        let searchText = query.get("q").toLowerCase();
        return searchQuery(allProducts, searchText);
      };
      setIsLoading(true);
      const allProducts = getSearch("all");
      if (allProducts) {
        const productsFiltered = getProdFiltered(allProducts);
        setProducts(productsFiltered);
        setIsLoading(false);
        return;
      }
      let mounted = true;
      const db = getFirestore();
      const itemsCollection = db.collection("items");
      itemsCollection
        .get()
        .then(querySnapshot => {
          const allProducts = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          const productsFiltered = getProdFiltered(allProducts);
          if (mounted) {
            setProducts(productsFiltered);
            setIsError(false);
            addSearch("all", allProducts);
          }
        })
        .catch(error => {
          if (mounted) {
            setProducts(null);
            setIsError({
              title: "Error de Carga",
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            });
          }
          console.log("Error obteniendo productos: ", error);
        })
        .finally(() => {
          if (mounted) {
            setIsLoading(false);
          }
        });

      return () => {
        mounted = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pathname]);

  useEffect(() => {
    if (pathname !== "/search") {
      setIsLoading(true);
      const searchesCache = getSearch(catId);
      if (searchesCache) {
        setProducts(searchesCache);
        setIsLoading(false);
        return;
      }
      let mounted = true;
      const db = getFirestore();
      const itemsCollection = db.collection("items");
      const query = itemsCollection.where("category", "==", catId);
      query
        .get()
        .then(querySnapshot => {
          const productsFiltered = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          if (productsFiltered.length === 0) {
            return Promise.reject("noProducts");
          }
          if (mounted) {
            setProducts(productsFiltered);
            setIsError(false);
            addSearch(catId, productsFiltered);
          }
        })
        .catch(error => {
          if (mounted) {
            let errorMsg;
            if (error === "noProducts") {
              errorMsg = {
                title: "Categoría Inexistente o Sin Productos",
                msg1: "Por favor verifique la dirección de su enlace.",
                msg2: "Disculpe las molestias."
              };
            } else {
              errorMsg = {
                title: "Error de Carga",
                msg1: "Intenta recargar la página o regresa más tarde.",
                msg2: "Disculpe las molestias."
              };
            }
            setProducts(null);
            setIsError(errorMsg);
          }
          console.log("Error obteniendo productos: ", error);
        })
        .finally(() => {
          if (mounted) {
            setIsLoading(false);
          }
        });

      return () => {
        mounted = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
