import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { getFirestore } from "../../firebase";
import "./HomeItemListContainer.scss";

const HomeItemListContainer = ({ greeting, legend }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let mounted = true;
    const db = getFirestore();
    const itemsCollection = db.collection("items");
    const query = itemsCollection.where("home", "==", true);
    query
      .get()
      .then(querySnapshot => {
        const homeProducts = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        if (mounted) {
          setProducts(homeProducts);
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
