import React from "react";
import { Row, Col } from "react-bootstrap";
import "./ItemDetail.scss";
import { priceFormat } from "../../services/formatPrice";

const ItemDetail = ({ product }) => {
  const {
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
    <div className="productDetail">
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
            <del>${priceFormat(price * 100)}</del>
          </p>
          <h3>DETALLE</h3>
          <p>{detail}</p>
        </Col>
      </Row>
    </div>
  );
};

export default ItemDetail;
