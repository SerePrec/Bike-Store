import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let temp;
    setIsLoading(true);
    const getProduct = () =>
      new Promise((resolve, reject) => {
        temp = setTimeout(() => {
          const i = Math.round(Math.random() * 2);
          resolve(productsServer[i]);
          //reject("Error de Carga");
        }, 2000);
      });

    getProduct()
      .then(res => {
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
  }, []);
  return (
    <>
      <InfoBar title="DETALLE DEL PRODUCTO"></InfoBar>
      <div
        className={`container-xl productDetailContainer ${
          isLoading && "loaded"
        }`}
      >
        {isLoading && (
          <Loader message={{ title: "Cargando Detalle Del Producto..." }} />
        )}
        {isError && (
          <Loader
            message={{
              title: isError,
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            }}
          />
        )}
        {product &&
          (product.stock > 0 ? (
            <ItemDetail product={product}></ItemDetail>
          ) : (
            <Loader
              message={{
                title: "Producto Inexistente O Agotado",
                msg1: "Es posible que el producto se haya agotado o discontinuado",
                msg2: "Disculpe las molestias."
              }}
            />
          ))}
      </div>
    </>
  );
};

export default ItemDetailContainer;
