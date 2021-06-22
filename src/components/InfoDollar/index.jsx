import React from "react";
import imgDollar from "../../assets/img/dolar.png";
import { priceFormat } from "../../services/priceFormat";
import "./InfoDollar.scss";

const InfoDollar = ({ dollar }) => {
  return (
    <div className={`dollar ${dollar && "loaded"}`}>
      <img src={imgDollar} alt="Dolar" />
      <p>
        {dollar
          ? `${priceFormat(dollar.dolarCompra)} / ${priceFormat(
              dollar.dolarVenta
            )}`
          : `--.-- / --.--`}
      </p>
    </div>
  );
};

export default InfoDollar;
