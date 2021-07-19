import React from "react";
import { Spinner } from "react-bootstrap";
import regularHeart from "../../assets/img/heart-regular.svg";
import solidHeart from "../../assets/img/heart-solid.svg";
import "./SetFavs.scss";

const SetFavs = ({ isFav, setFav, isLoading }) => {
  return (
    <div
      className={`setFavs ${isLoading ? "loading" : ""}`}
      onClick={!isLoading ? setFav : null}
    >
      <img src={isFav ? solidHeart : regularHeart} alt="" />
      <p>{isFav ? "Quitar de mis favoritos" : "Añadir a mis favoritos"}</p>
      {isLoading && (
        <Spinner animation="border" size="sm" role="status"></Spinner>
      )}
    </div>
  );
};

export default SetFavs;
