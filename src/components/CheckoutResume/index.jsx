import React from "react";
import { Col } from "react-bootstrap";
import ShipmentOptions from "../ShipmentOptions";
import SummaryTable from "../SummaryTable";
import { priceFormat } from "../../utils/priceFormat";
import "./CheckoutResume.scss";

const CheckoutResume = ({
  cart,
  shipmentForm,
  changeShipment,
  shipmentCost,
  totPriceInCart,
  totalPrice
}) => {
  return (
    <Col md={5} className="checkoutResume">
      <h3>Resumen de compra</h3>
      <SummaryTable cart={cart} totPriceInCart={totPriceInCart}></SummaryTable>
      <ShipmentOptions
        shipmentForm={shipmentForm}
        changeShipment={changeShipment}
        shipmentCost={shipmentCost}
      ></ShipmentOptions>
      <div className="totalPrice">
        <p>
          TOTAL DE COMPRA <span>${priceFormat(totalPrice)}</span>
        </p>
      </div>
      <div className="help">
        <p>
          <b>¿Necesitas ayuda? </b>Llamanos al <span>0800-888-1234</span>
        </p>
      </div>
    </Col>
  );
};

export default CheckoutResume;
