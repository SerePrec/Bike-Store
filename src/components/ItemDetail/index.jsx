import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ItemCount from "../ItemCount";
import ShipmentInfo from "../ShipmentInfo";
import { priceFormat } from "../../utils/priceFormat";
import "./ItemDetail.scss";

import InfoMessage from "../InfoMessage";
import TypicButton from "../TypicButton";
import { Link } from "react-router-dom";

const ItemDetail = ({ product }) => {
  const [itemAddedData, setItemAddedData] = useState(null);

  let {
    id,
    title,
    brand,
    price,
    discount,
    pictureURL,
    detail,
    category,
    stock
  } = product;

  const onAdd = qty => {
    setItemAddedData({ product, qty });
  };

  return (
    <div
      className={`productDetail ${stock < 1 ? "productDetail--noStock" : ""}`}
    >
      <Row className="productDetail_title mb-5">
        <Col xs={12} sm={9}>
          <h1>{title}</h1>
        </Col>
        <Col xs={12} sm={3}>
          <h3>{brand}</h3>
        </Col>
      </Row>
      <Row className="productDetail_data">
        <Col xs={12} md={7}>
          {discount !== 0 && <div className="discount">{discount}%</div>}
          <img
            src={process.env.PUBLIC_URL + `/img/${pictureURL}`}
            alt={title}
          />
        </Col>
        <Col xs={12} md={5}>
          <h4>{category.toUpperCase()}</h4>
          <p className="price">
            <b>${priceFormat(price * (1 - discount / 100))}</b>
            {discount !== 0 && <del>${priceFormat(price)}</del>}
          </p>
          <h3>DETALLE</h3>
          <p>{detail}</p>
          {itemAddedData ? (
            <InfoMessage
              className="mt-2"
              msg={`Seleccionaste ${itemAddedData.qty}u para agregar a tu carrito`}
              type="info"
              animation="animate__fadeIn"
            />
          ) : (
            <p className="productDetail_stock">Disponible: {stock}u</p>
          )}
          {itemAddedData ? (
            <TypicButton
              as={Link}
              to={"/cart"}
              className="w-100 font-weight-bold animate__slideInUp"
            >
              TERMINAR MI COMPRA
            </TypicButton>
          ) : (
            <ItemCount stock={stock} initial={1} onAdd={onAdd} />
          )}
          <ShipmentInfo />
        </Col>
      </Row>
    </div>
  );
};

export default ItemDetail;
