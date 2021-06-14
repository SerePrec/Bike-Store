import React from "react";
import imgDollar from "../../assets/img/dolar.png";
import "./InfoDollar.scss";

const InfoDollar = ({ dollar }) => {
  return (
    <div className={`dollar ${dollar && "loaded"}`}>
      <img src={imgDollar} alt="Dolar" />
      <p>
        {dollar
          ? `${dollar.dolarCompra} / ${dollar.dolarVenta}`
          : `--.-- / --.--`}
      </p>
    </div>
  );
};

export default InfoDollar;
