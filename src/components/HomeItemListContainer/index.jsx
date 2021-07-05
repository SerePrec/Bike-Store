import React, { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { getFirestore } from "../../firebase";
import "./HomeItemListContainer.scss";

//TODO:
import productsServer from "../../utils/productos.json";

const HomeItemListContainer = ({ greeting, legend }) => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = getFirestore();
    const itemsCollection = db.collection("items");
    const query = itemsCollection.where("home", "==", true);
    query
      .get()
      .then(querySnapshot => {
        const homeProducts = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setProducts(homeProducts);
        setIsError(false);
      })
      .catch(error => {
        setProducts(null);
        setIsError({
          title: "Error de Carga",
          msg1: "Intenta recargar la página o regresa más tarde.",
          msg2: "Disculpe las molestias."
        });
        console.log("Error obteniendo productos: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
