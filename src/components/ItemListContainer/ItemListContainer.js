import React from "react";
import "./itemListcontainer.scss";

import prodPueba from "../../assets/img/producto49.jpg"; //TODO:TODO:

const ItemListContainer = ({ greeting, leyenda }) => {
  return (
    <div className="container-xl homeHighlights">
      <div>
        <h2>{greeting}</h2>
        <p>{leyenda}</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 homeProductsContainer">
        <div className="col mb-4">
          <div className="card h-100">
            <img
              src={prodPueba}
              className="card-img-top"
              alt="Pulsómetro De Bicicleta Bryton Rider 750 T Cadencia, FC Y Veloc."
            />
            <div className="card-body">
              <h5 className="card-title">BRYTON</h5>
              <p className="card-text">
                Pulsómetro De Bicicleta Bryton Rider 750 T Cadencia, FC Y Veloc.
              </p>
              <p className="my-2">
                <b>Precio: $41.158,46</b>{" "}
              </p>
              <p className="my-2">Disponible: 4u</p>
              <div className="form-inline">
                <button
                  type="button"
                  className="btn btn-danger w-50 btn-add"
                  data-producto-id="49"
                >
                  Agregar
                </button>
                <input
                  type="number"
                  className="form-control ml-2 input-Quantity"
                  defaultValue="1"
                  min="1"
                  max="4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;
