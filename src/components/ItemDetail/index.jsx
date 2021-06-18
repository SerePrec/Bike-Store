import React from "react";
import { Row, Col } from "react-bootstrap";
import ItemCount from "../ItemCount";
import ShipmentInfo from "../ShipmentInfo";
import { priceFormat } from "../../services/formatPrice";
import "./ItemDetail.scss";

const ItemDetail = ({ product }) => {
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

  return (
    <div
      className={`productDetail ${stock < 1 ? "productDetail--noStock" : null}`}
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
            <b>${priceFormat(price * (1 - discount / 100) * 100)}</b>
            {discount !== 0 && <del>${priceFormat(price * 100)}</del>}
          </p>
          <h3>DETALLE</h3>
          <p>{detail}</p>
          <p className="productDetail_stock">Disponible: {stock}u</p>
          <ItemCount
            stock={stock}
            initial={1}
            onAdd={qty => alert(`Agregaste ${qty} producto/s al carrito`)}
          />
          <ShipmentInfo />
        </Col>
      </Row>
    </div>
  );
};

export default ItemDetail;
