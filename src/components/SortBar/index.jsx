import React from "react";
import PillBadge from "../PillBadge";
import SortSelector from "../SortSelector";
import "./SortBar.scss";

const SortBar = ({ isLoading, filteredProducts, filters, handleChange }) => {
  return (
    <div className="col-12 mb-3 sortBar">
      <div>
        <h4>Filtrados: </h4>
        {!isLoading && filteredProducts && (
          <PillBadge variant="secondary">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </PillBadge>
        )}
      </div>
      <SortSelector value={filters.sort} handleChange={handleChange} />
    </div>
  );
};

export default SortBar;
