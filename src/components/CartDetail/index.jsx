import React from "react";
import { Row } from "react-bootstrap";
import CartTable from "../CartTable";
import TypicButton from "../TypicButton";
import trash from "../../assets/img/trash.svg";
import check from "../../assets/img/check.svg";
import "./CartDetail.scss";

const CartDetail = props => {
  const { cart, clearCart } = props;
  const totalItems = cart.reduce((total, elem) => total + elem.qty, 0);

  return (
    <div className="cartDetail animate__zoomIn">
      <Row noGutters className="mb-2">
        <p>Tienes {totalItems} productos</p>
      </Row>
      <TypicButton
        className="mb-3 mx-auto soft font-weight-bold"
        onClick={clearCart}
      >
        VACIAR CARRITO <img src={trash} alt="" />
      </TypicButton>
      <Row noGutters>
        <CartTable {...props} />
      </Row>
      <TypicButton className="my-3 mx-auto font-weight-bold">
        CONFIRMAR MI PEDIDO
        <img src={check} alt="" />
      </TypicButton>
    </div>
  );
};

export default CartDetail;
