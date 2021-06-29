import React from "react";
import { Form } from "react-bootstrap";
import TypicButton from "../TypicButton";
import toogleOff from "../../assets/img/toggle-off.svg";
import toogleOn from "../../assets/img/toggle-on.svg";
import "./PropertyListFilter.scss";

const PropertyListFilter = ({
  title,
  filterProp,
  valuesToList,
  handleChangeProp,
  buttonClass
}) => {
  return (
    <div className="propFilter">
      <TypicButton className={`mb-3 ${buttonClass ? buttonClass : ""}`}>
        {title}
        {filterProp.length === 0 ? (
          <img src={toogleOff} alt="" />
        ) : (
          <img src={toogleOn} alt="" />
        )}
      </TypicButton>
      {valuesToList && valuesToList.length > 0 && (
        <div className="propList">
          {valuesToList.map(elem => (
            <Form.Group key={elem.name} controlId={elem.name}>
              <Form.Check
                name={elem.name}
                type="checkbox"
                label={`${elem.name.toUpperCase()} (${elem.qty})`}
                onChange={handleChangeProp}
                checked={filterProp.some(val => val === elem.name)}
                disabled={valuesToList.length === 1}
              />
            </Form.Group>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListFilter;
