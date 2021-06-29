import React from "react";
import iconSearch from "../../assets/img/icon_search_r.svg";
import "./EmptyResults.scss";

const EmptyResults = () => {
  return (
    <div className="emptyResults">
      <img src={iconSearch} alt="Lupa" />
      <h2>¡Oops!</h2>
      <h3>No existe ningún producto con estos criterios de búsqueda.</h3>
      <h3>Prueba modificando alguno.</h3>
    </div>
  );
};

export default EmptyResults;
