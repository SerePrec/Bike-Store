import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { priceFormat } from "../../services/formatPrice";
import "./Item.scss";

import imgBlank from "../../assets/img/blank.gif";

const Item = ({ product }) => {
  const { id, title, brand, price, discount, pictureURL, stock } = product;

  const [fakeLoad, setFakeLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoad(true);
    }, Math.random() * 2000);
  }, []);

  useEffect(() => {
    let temp;
    const getImage = new Promise((resolve, reject) => {
      temp = setTimeout(() => {
        resolve();
      }, Math.random() * 2000);
    });
    getImage.then(res => {
      setFakeLoad(true);
    });

    return () => {
      clearInterval(temp);
    };
  }, []);

  return (
    <Card className={`h-100 shadow ${stock < 1 ? "soldOut" : null}`}>
      {discount !== 0 && <div className="discount">{discount}%</div>}
      <Card.Img
        variant="top"
        src={
          fakeLoad ? process.env.PUBLIC_URL + `/img/${pictureURL}` : imgBlank
        }
        alt="Pulsómetro De Bicicleta Bryton Rider 750 T Cadencia, FC Y Veloc."
      />
      <Card.Body>
        <Card.Title>{brand}</Card.Title>
        <Card.Text>{title}</Card.Text>
        <Card.Text className="mt-2">
          <b>${priceFormat(price * (1 - discount / 100) * 100)}</b>
          <del>${priceFormat(price * 100)}</del>
        </Card.Text>
      </Card.Body>
      {stock < 1 && <div className="noStock">AGOTADO</div>}
    </Card>
  );
};

export default Item;
