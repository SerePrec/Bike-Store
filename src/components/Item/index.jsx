import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import { priceFormat } from "../../utils/priceFormat";
import regularHeart from "../../assets/img/heart-regular.svg";
import solidHeart from "../../assets/img/heart-solid.svg";
import imgBlank from "../../assets/img/blank.gif";
import "./Item.scss";

const Item = ({ product, isFav }) => {
  const { id, title, brand, price, discount, pictureURL, stock } = product;
  const [imgLoad, setImgLoad] = useState(false);
  let history = useHistory();

  const goDetail = id => {
    history.push(`/item/${id}`);
  };

  const handleLoad = () => {
    setImgLoad(true);
  };

  return (
    <Card
      className={`h-100 shadow ${stock < 1 ? "card--noStock" : ""}`}
      onClick={stock > 0 ? () => goDetail(id) : null}
    >
      <div className="fav">
        <img src={isFav ? solidHeart : regularHeart} alt="" />
      </div>
      {discount !== 0 && <div className="discount">{discount}%</div>}
      <Card.Img
        onLoad={handleLoad}
        variant="top"
        src={imgLoad ? pictureURL : imgBlank}
        alt={title}
      />
      <Card.Body>
        <Card.Title>{brand}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <Card.Text className="mt-2">
          <b>${priceFormat(price * (1 - discount / 100))}</b>
          {discount !== 0 && <del>${priceFormat(price)}</del>}
        </Card.Text>
      </Card.Body>
      {stock < 1 && <div className="text--noStock">AGOTADO</div>}
    </Card>
  );
};

export default Item;
