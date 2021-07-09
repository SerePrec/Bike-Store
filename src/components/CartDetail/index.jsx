import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import CartTable from "../CartTable";
import InfoMessage from "../InfoMessage";
import TypicButton from "../TypicButton";
import trash from "../../assets/img/trash.svg";
import check from "../../assets/img/check.svg";
import cartIcon from "../../assets/img/icon_cart2.png";
import signInIcon from "../../assets/img/sign-in-alt.svg";
import "./CartDetail.scss";

const CartDetail = props => {
  const {
    clearCart,
    totQtyInCart,
    checkInRange,
    handleSaveCart,
    userId,
    ...restProps
  } = props;

  console.log(userId);

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
        <CartTable {...restProps} checkInRange={checkInRange} />
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
          <TypicButton
            as={Link}
            to={userId ? "/checkout" : "/myaccount"}
            className="my-3 font-weight-bold"
          >
            {userId ? "CONFIRMAR MI PEDIDO" : "LOGUEATE para continuar"}
            {userId ? (
              <img src={check} alt="" />
            ) : (
              <img src={signInIcon} alt="" />
            )}
          </TypicButton>
        )}
      </Row>
    </div>
  );
};

export default CartDetail;
