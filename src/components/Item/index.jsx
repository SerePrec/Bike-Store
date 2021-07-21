import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import ImgWidthLoader from "../ImgWidthLoader";
import { priceFormat } from "../../utils/priceFormat";
import regularHeart from "../../assets/img/heart-regular.svg";
import solidHeart from "../../assets/img/heart-solid.svg";
import "./Item.scss";

const Item = React.memo(
  ({ product, isFav }) => {
    const { id, title, brand, price, discount, pictureURL, stock } = product;
    let history = useHistory();

    const goDetail = id => {
      history.push(`/item/${id}`);
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
        <ImgWidthLoader
          className="card-img-top"
          pictureURL={pictureURL}
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
  },
  (prevProps, nextProps) => prevProps.isFav === nextProps.isFav
);

export default Item;
