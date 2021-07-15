import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { priceFormat } from "../../utils/priceFormat";
import houseIcon from "../../assets/img/casa.svg";
import truckIcon from "../../assets/img/camion.svg";
import "./ShipmentOptions.scss";

const ShipmentOptions = ({ shipmentForm, changeShipment, shipmentCost }) => {
  return (
    <>
      <h4>Envío</h4>
      <Form.Group as={Row} className="shipmentOptions">
        <Col sm={12}>
          <Form.Check
            type="radio"
            name="shipment"
            value="1"
            label={
              <>
                <div>
                  <img src={truckIcon} alt="" />
                  Envío a domicilio
                </div>
                <span>
                  {shipmentCost > 0
                    ? `$${priceFormat(shipmentCost)}`
                    : "GRATIS"}
                </span>
              </>
            }
            checked={shipmentForm.shipment === "1"}
            onChange={changeShipment}
            id="inputRadioA"
          />
          <Form.Check
            type="radio"
            name="shipment"
            value="0"
            label={
              <>
                <div>
                  <img src={houseIcon} alt="" />
                  Retiro por sucursal
                </div>
                <span>GRATIS</span>
              </>
            }
            checked={shipmentForm.shipment === "0"}
            onChange={changeShipment}
            id="inputRadioB"
          />
        </Col>
      </Form.Group>
      <div className="subTot">
        <p>
          Costo de envío $
          {shipmentForm.shipment === "1" ? priceFormat(shipmentCost) : "0,00"}
        </p>
      </div>
    </>
  );
};

export default ShipmentOptions;
