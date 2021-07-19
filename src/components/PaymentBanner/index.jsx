import React from "react";
import moneyIcon from "../../assets/img/icon_money.png";
import "./PaymentBanner.scss";

const PaymentBanner = () => {
  return (
    <div className="paymentBanner">
      <div className="paymentBanner__item">
        <div className="image">
          <img src={moneyIcon} alt="sucursal" />
        </div>
        <span>Financia tus compras en 3, 6, 12 y 18 cuotas</span>
      </div>
    </div>
  );
};

export default PaymentBanner;
