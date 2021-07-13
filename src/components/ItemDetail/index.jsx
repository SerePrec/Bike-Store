import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import InfoMessage from "../InfoMessage";
import ItemCount from "../ItemCount";
import ShipmentInfo from "../ShipmentInfo";
import TypicButton from "../TypicButton";
import { priceFormat } from "../../utils/priceFormat";
import { modalMessages } from "../../utils/cartModalMessages";
import cartIcon from "../../assets/img/icon_cart2.png";
import "./ItemDetail.scss";

const ItemDetail = ({ product, handleShowModal, setContentModal }) => {
  const [addedItemQuantity, setAddedItemQuantity] = useState(null);
  const { addToCart, isInCart, getFromCart, checkCartLength } =
    useContext(CartContext);

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
    const selection = { product, qty };
    if (isInCart(id) || checkCartLength()) {
      const addedQty = addToCart(selection);
      setAddedItemQuantity(addedQty);
    } else {
      setContentModal(modalMessages[8]);
      handleShowModal();
    }
  };

  const inCart = isInCart(id);
  let qtyInCart = 0;
  if (inCart) {
    qtyInCart = getFromCart(id).qty;
  }

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
          {addedItemQuantity > 0 ? (
            <InfoMessage
              className="mt-2"
              msg={`Seleccionaste ${addedItemQuantity}u para agregar a tu carrito`}
              type="info"
              animation="animate__fadeIn"
            />
          ) : (
            <p className="productDetail_stock">Stock: {stock}u</p>
          )}
          {inCart && !(addedItemQuantity > 0) && (
            <p className="productDetail_inCart">
              Ya en tu <img src={cartIcon} alt="" /> : {qtyInCart}u
            </p>
          )}
          {addedItemQuantity > 0 ? (
            <>
              <TypicButton
                as={Link}
                to={"/cart"}
                className="w-100 font-weight-bold animate__slideInUp"
              >
                TERMINAR MI COMPRA
              </TypicButton>
              <TypicButton
                onClick={() => setAddedItemQuantity(null)}
                className="w-50 font-weight-bold mt-3 animate__slideInUp black"
              >
                AGREGAR MÁS
              </TypicButton>
            </>
          ) : (
            <ItemCount stock={stock - qtyInCart} initial={1} onAdd={onAdd} />
          )}
          <ShipmentInfo />
        </Col>
      </Row>
    </div>
  );
};

export default ItemDetail;
