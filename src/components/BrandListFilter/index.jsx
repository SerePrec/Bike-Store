import React from "react";
import { Form } from "react-bootstrap";
import TypicButton from "../TypicButton";
import plusIcon from "../../assets/img/plus.svg";
import toogleOff from "../../assets/img/toggle-off.svg";
import toogleOn from "../../assets/img/toggle-on.svg";
import "./BrandListFilter.scss";

const BrandListFilter = ({ filters, brands, handleChangeBrands }) => {
  return (
    <div className="brandsFilter">
      <TypicButton className="mb-3">
        <img src={plusIcon} alt="" />
        MARCAS
        {filters.brands.length === 0 ? (
          <img src={toogleOff} alt="" />
        ) : (
          <img src={toogleOn} alt="" />
        )}
      </TypicButton>
      {brands && (
        <div className="brandList">
          {brands.map(elem => (
            <Form.Group key={elem.brand} controlId={elem.brand}>
              <Form.Check
                name={elem.brand}
                type="checkbox"
                label={`${elem.brand} (${elem.qty})`}
                onChange={handleChangeBrands}
                checked={filters.brands.some(brand => brand === elem.brand)}
              />
            </Form.Group>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandListFilter;
