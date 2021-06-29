import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { priceFormat } from "../../utils/priceFormat";
import "./Item.scss";

import imgBlank from "../../assets/img/blank.gif";

const Item = ({ product }) => {
  const { id, title, brand, price, discount, pictureURL, stock } = product;

  const [fakeLoad, setFakeLoad] = useState(false);

  let history = useHistory();

  useEffect(() => {
    let temp;
    const getImage = new Promise(resolve => {
      temp = setTimeout(() => {
        resolve(true);
      }, Math.random() * 2000);
    });
    getImage.then(res => {
      setFakeLoad(res);
    });

    return () => {
      clearInterval(temp);
    };
  }, []);

  const goDetail = id => {
    history.push(`/item/${id}`);
  };

  return (
    <Card
      className={`h-100 shadow ${stock < 1 ? "card--noStock" : ""}`}
      onClick={stock > 0 ? () => goDetail(id) : null}
    >
      {discount !== 0 && <div className="discount">{discount}%</div>}
      <Card.Img
        variant="top"
        src={
          fakeLoad ? process.env.PUBLIC_URL + `/img/${pictureURL}` : imgBlank
        }
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
