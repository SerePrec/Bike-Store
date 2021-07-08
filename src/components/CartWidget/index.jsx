import React, { useState, useEffect, useContext } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import iconCart from "../../assets/img/icon_cart.svg";
import "./CartWidget.scss";

const CartWidget = () => {
  const { totQtyInCart } = useContext(CartContext);
  const prevTotQty = usePrevious(totQtyInCart);
  const [animation, setAnimation] = useState(null);
  const [numToShow, setNumToShow] = useState(totQtyInCart);

  useEffect(() => {
    let temp;
    if (totQtyInCart < prevTotQty) {
      setAnimation("animate__fadeOutUp");
      temp = setTimeout(() => {
        setAnimation(null);
        setNumToShow(totQtyInCart);
      }, 500);
    } else if (totQtyInCart !== 0) {
      setAnimation("animate__fadeInDown");
      setNumToShow(totQtyInCart);
      temp = setTimeout(() => {
        setAnimation(null);
      }, 500);
    }
    return () => {
      clearTimeout(temp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totQtyInCart]);

  return (
    <>
      <Nav.Link as={Link} to={`/cart`} className="cartWidget">
        <span
          className={`itemsQuantity ${animation || ""} ${
            totQtyInCart === 0 ? "hidden" : ""
          }`}
        >
          {numToShow}
        </span>
        <img src={iconCart} alt="Carrito" />
      </Nav.Link>
    </>
  );
};

export default CartWidget;
