import React from "react";
import houseIcon from "../../assets/img/casa.svg";
import truckIcon from "../../assets/img/camion.svg";
import "./ShipmentInfo.scss";

const ShipmentInfo = () => {
  return (
    <div className="shipmentInfo">
      <div>
        <img src={houseIcon} alt="sucursal" />
        <span>Retiro GRATIS por Sucursal</span>
      </div>
      <div>
        <img src={truckIcon} alt="camión" />
        <span>Envíos a todo el país</span>
      </div>
      <div>
        <p>
          Envíos <b>GRATIS</b> a todo el país
        </p>
        <p>en compras mayores a $8000</p>
      </div>
    </div>
  );
};

export default ShipmentInfo;
