import React, { useState, useEffect } from "react";
import ItemCount from "../ItemCount";
import ItemList from "../ItemList";
import Loader from "../Loader";
import "./itemListcontainer.scss";

//TODO:
import productsServer from "../../services/productos.json";

const ItemListContainer = ({ greeting, legend }) => {
  const [productsHome, setProductsHome] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let temp;
    const getProducts = new Promise((resolve, reject) => {
      setIsLoading(true);
      temp = setTimeout(() => {
        resolve(productsServer);
        //reject("Error de Carga");
      }, 2000);
    });
    getProducts
      .then(res => {
        setProductsHome(res);
        setIsError(false);
      })
      .catch(err => {
        setProductsHome(null);
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
    <div className="container-xl homeHighlights">
      <div>
        <h2>{greeting}</h2>
        <p>{legend}</p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 homeProductsContainer">
        {isLoading && <Loader message={{ title: "Cargando..." }} />}
        {isError && (
          <Loader
            message={{
              title: isError,
              msg1: "Intenta recargar la página o regresa más tarde.",
              msg2: "Disculpe las molestias."
            }}
          />
        )}
        {productsHome && <ItemList products={productsHome} />}

        {/* <div className="col mb-4">
          <h3>Producto ....</h3>
          <h4>Stock: 12u</h4>
          <ItemCount
            stock={12}
            initial={1}
            onAdd={qty => alert(`Se agregaron ${qty} productos al carrito`)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ItemListContainer;
