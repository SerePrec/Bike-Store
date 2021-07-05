import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { priceFormat } from "../../utils/priceFormat";
import "./Item.scss";

import imgBlank from "../../assets/img/blank.gif";

const Item = ({ product }) => {
  const { id, title, brand, price, discount, pictureURL, stock } = product;
  const [imgLoad, setImgLoad] = useState(false);
  const imageRef = useRef(null);
  let history = useHistory();

  const goDetail = id => {
    history.push(`/item/${id}`);
  };

  useEffect(() => {
    const imageEl = imageRef.current;
    const handleLoad = () => {
      setImgLoad(true);
    };
    imageEl.addEventListener("load", handleLoad);

    return () => {
      imageEl.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Card
      className={`h-100 shadow ${stock < 1 ? "card--noStock" : ""}`}
      onClick={stock > 0 ? () => goDetail(id) : null}
    >
      {discount !== 0 && <div className="discount">{discount}%</div>}
      <Card.Img
        ref={imageRef}
        variant="top"
        src={imgLoad ? process.env.PUBLIC_URL + `/img/${pictureURL}` : imgBlank}
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
