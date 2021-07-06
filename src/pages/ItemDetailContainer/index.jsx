import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import InfoBar from "../../components/InfoBar";
import ItemDetail from "../../components/ItemDetail";
import Loader from "../../components/Loader";
import { getFirestore } from "../../firebase";
import "./ItemDetailcontainer.scss";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { itemId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    let mounted = true;
    const db = getFirestore();
    const itemsCollection = db.collection("items");
    const docRef = itemsCollection.doc(itemId);
    docRef
      .get()
      .then(doc => {
        if (doc.exists && mounted) {
          const product = { id: doc.id, ...doc.data() };
          setProduct(product);
          setIsError(false);
        } else {
          return Promise.reject("noProduct");
        }
      })
      .catch(error => {
        if (mounted) {
          let errorMsg;
          if (error === "noProduct") {
            errorMsg = {
              title: "Producto Inexistente",
              msg1: "Es posible que el producto se haya discontinuado o no exista.",
              msg2: "Disculpe las molestias."
            };
          } else {
            errorMsg = {
              title: "Error de Carga",
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            };
          }
          setProduct(null);
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
  }, [itemId]);

  return (
    <main>
      <InfoBar title="DETALLE DEL PRODUCTO"></InfoBar>
      <div
        className={`container-xl productDetailContainer ${
          isLoading ? "loaded" : ""
        }`}
      >
        {isLoading && (
          <Loader message={{ title: "Cargando Detalle Del Producto..." }} />
        )}
        {isError && <Loader message={isError} />}
        {product && <ItemDetail product={product}></ItemDetail>}
      </div>
    </main>
  );
};

export default ItemDetailContainer;
