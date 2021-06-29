import React from "react";
import EmptyResults from "../EmptyResults";
import Item from "../Item";
import Loader from "../Loader";
import "./ItemList.scss";

const ItemList = ({ isLoading, isError, products, filters }) => {
  return (
    <>
      <div
        className={`row row-cols-1 productsContainer ${
          filters
            ? "row-cols-md-2 row-cols-xl-3 filters"
            : "row-cols-sm-2 row-cols-lg-3 row-cols-xl-4"
        }`}
      >
        {isLoading && <Loader message={{ title: "Cargando..." }} />}
        {!isLoading && isError && <Loader message={isError} />}
        {!isLoading &&
          products &&
          (products.length === 0 ? (
            <EmptyResults />
          ) : (
            products.map(product => (
              <div key={product.id} className="col mb-4">
                <Item product={product} />
              </div>
            ))
          ))}
      </div>
    </>
  );
};

export default ItemList;
