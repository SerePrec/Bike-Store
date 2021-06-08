import React from "react";
import "./itemListcontainer.scss";

const ItemListContainer = ({ greeting, legend }) => {
  return (
    <div className="container-xl homeHighlights">
      <div>
        <h2>{greeting}</h2>
        <p>{legend}</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 homeProductsContainer"></div>
    </div>
  );
};

export default ItemListContainer;
