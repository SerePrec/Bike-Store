import React from "react";
import ItemCount from "../ItemCount";
import Item from "../Item";
import "./itemListcontainer.scss";

import products from "../../services/productos.json";
console.log(products);

const ItemListContainer = ({ greeting, legend }) => {
  return (
    <div className="container-xl homeHighlights">
      <div>
        <h2>{greeting}</h2>
        <p>{legend}</p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 homeProductsContainer">
        <div className="col mb-4">
          <h3>Producto ....</h3>
          <h4>Stock: 12u</h4>
          <ItemCount
            stock={12}
            initial={1}
            onAdd={qty => alert(`Se agregaron ${qty} productos al carrito`)}
          />
        </div>
        <div className="col mb-4">
          <Item product={products[0]} />
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;
