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

  useEffect(() => {
    let temp;
    const callProducts = new Promise((resolve, reject) => {
      setIsLoading(true);
      temp = setTimeout(() => {
        resolve(productsServer);
      }, 2000);
    });
    callProducts.then(res => {
      setProductsHome(res);
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
        {isLoading && <Loader msg={"Cargando..."} />}
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
