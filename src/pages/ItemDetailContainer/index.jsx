import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import InfoBar from "../../components/InfoBar";
import ItemDetail from "../../components/ItemDetail";
import Loader from "../../components/Loader";
import "./ItemDetailcontainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { itemId } = useParams();

  useEffect(() => {
    let temp;
    setIsLoading(true);
    const getProduct = () =>
      new Promise((resolve, reject) => {
        temp = setTimeout(() => {
          const product = productsServer.find(elem => elem.id === itemId);
          resolve(product);
          // reject({
          //   title: "Error de Carga",
          //   msg1: "Intenta recargar la página o regresa más tarde.",
          //   msg2: "Disculpe las molestias."
          // });
        }, 2000);
      });

    getProduct()
      .then(res => {
        if (!res) {
          return Promise.reject({
            title: "Producto Inexistente",
            msg1: "Es posible que el producto se haya discontinuado o no exista.",
            msg2: "Disculpe las molestias."
          });
        }
        setProduct(res);
        setIsError(false);
      })
      .catch(err => {
        setProduct(null);
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      clearInterval(temp);
    };
  }, [itemId]);

  return (
    <main>
      <InfoBar title="DETALLE DEL PRODUCTO"></InfoBar>
      <div
        className={`container-xl productDetailContainer ${
          isLoading && "loaded"
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
