import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { searchQuery } from "../utils/productsFilter";
import { getFirestore } from "../firebase";

export const useSearch = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { catId } = useParams();
  let { search, pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/search") {
      setIsLoading(true);
      let mounted = true;
      const db = getFirestore();
      const itemsCollection = db.collection("items");
      itemsCollection
        .get()
        .then(querySnapshot => {
          const allProducts = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          let query = new URLSearchParams(search);
          let searchText = query.get("q").toLowerCase();
          const productsFiltered = searchQuery(allProducts, searchText);
          if (mounted) {
            setProducts(productsFiltered);
            setIsError(false);
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
  }, [search, pathname]);

  useEffect(() => {
    if (pathname !== "/search") {
      setIsLoading(true);
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
