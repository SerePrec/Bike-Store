import React from "react";
import { Row } from "react-bootstrap";
import CartTable from "../CartTable";
import InfoMessage from "../InfoMessage";
import TypicButton from "../TypicButton";
import trash from "../../assets/img/trash.svg";
import check from "../../assets/img/check.svg";
import cartIcon from "../../assets/img/icon_cart2.png";
import "./CartDetail.scss";

const CartDetail = props => {
  const {
    clearCart,
    totQtyInCart,
    checkInRange,
    handleSaveCart,
    ...restProps
  } = props;

  return (
    <div className="cartDetail animate__zoomIn">
      <Row noGutters className="mb-2">
        <p>
          Tienes {totQtyInCart} {totQtyInCart === 1 ? "producto" : "productos"}
        </p>
      </Row>
      <TypicButton
        className="mb-3 mx-auto soft font-weight-bold"
        onClick={clearCart}
      >
        VACIAR CARRITO <img src={trash} alt="" />
      </TypicButton>
      <Row noGutters>
        <CartTable {...restProps} />
      </Row>
      {!checkInRange && (
        <Row noGutters>
          <InfoMessage
            msg={`Actualice los valores con nuestra disponibilidad para poder continuar`}
            type="warning"
            animation="animate__slideInUp"
            className="w-100"
          />
        </Row>
      )}
      <Row noGutters>
        <TypicButton
          className="my-3 font-weight-bold black"
          onClick={handleSaveCart}
        >
          GUARDAR
          <img src={cartIcon} alt="" />
        </TypicButton>
        {checkInRange && (
          <TypicButton className="my-3 font-weight-bold">
            CONFIRMAR MI PEDIDO
            <img src={check} alt="" />
          </TypicButton>
        )}
      </Row>
    </div>
  );
};

export default CartDetail;
