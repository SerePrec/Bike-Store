import React, { useContext, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Row } from "react-bootstrap";
import CartModal from "../../components/CartModal";
import CheckoutForm from "../../components/CheckoutForm";
import CheckoutResume from "../../components/CheckoutResume";
import LoaderModal from "../../components/LoaderModal";
import OrderModal from "../../components/OrderModal";
import InfoBar from "../../components/InfoBar";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { useConfirmOrder } from "../../hooks/useConfirmOrder";
import { useSetForm } from "../../hooks/useSetForm";
import { fakeShipment } from "../../utils/fakeShipment";

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const { authUser } = useContext(UserContext);
  const { form: shipmentForm, handleChange: changeShipment } = useSetForm({
    shipment: "1"
  });
  let history = useHistory();
  const { cart, totQtyInCart, totPriceInCart, checkInRange } = cartContext;
  const snapShotCart = useRef({ cart, totPriceInCart });
  const shipmentCost = fakeShipment(snapShotCart.current.cart);
  let totalPrice =
    shipmentForm.shipment === "1"
      ? snapShotCart.current.totPriceInCart + shipmentCost
      : snapShotCart.current.totPriceInCart;

  const {
    active,
    orderId,
    isError,
    contentLoaderModal,
    showLoaderModal,
    contentCartModal,
    showCartModal,
    showOrderModal,
    contentOrderModal,
    handleCloseOrderModal,
    confirmOrder
  } = useConfirmOrder({
    cartContext,
    authUser,
    shipmentForm,
    shipmentCost,
    totalPrice
  });

  const goCart = () => {
    history.push("/cart");
  };

  const goHome = () => {
    history.push("/");
  };

  const checkoutResumeProps = {
    cart: snapShotCart.current.cart,
    shipmentForm,
    changeShipment,
    shipmentCost,
    totPriceInCart: snapShotCart.current.totPriceInCart,
    totalPrice
  };

  const checkoutFormProps = {
    totalPrice,
    shipmentType: shipmentForm.shipment,
    confirmOrder,
    userEmail: authUser.email
  };

  const cartModalProps = {
    showModal: showCartModal,
    handleCloseModal: goCart,
    contentModal: contentCartModal,
    backdrop: "static"
  };

  const orderModalProps = {
    showModal: showOrderModal,
    handleCloseModal: orderId ? goHome : handleCloseOrderModal,
    contentModal: contentOrderModal,
    error: !!isError,
    backdrop: "static"
  };

  if (!((totQtyInCart > 0 && checkInRange) || active.current))
    return <Redirect to="/cart"></Redirect>;
  return (
    <main>
      <InfoBar title="CHECKOUT"></InfoBar>
      <div className="container-xl px-0 animate__zoomIn">
        <Row className="checkout mx-0 mr-md-n3">
          <CheckoutResume {...checkoutResumeProps}></CheckoutResume>
          <CheckoutForm {...checkoutFormProps}></CheckoutForm>
        </Row>
      </div>
      <LoaderModal
        showModal={showLoaderModal}
        contentModal={contentLoaderModal}
      ></LoaderModal>
      <CartModal {...cartModalProps} />
      <OrderModal {...orderModalProps} />
    </main>
  );
};

export default Checkout;
