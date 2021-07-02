import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import CartDetail from "../../components/CartDetail";
import EmptyCart from "../../components/EmptyCart";
import InfoBar from "../../components/InfoBar";
import { modalMessages } from "../../utils/cartModalMessages";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(modalMessages[0]);

  const { cart, setCart, saveCartInLocalStorage } = cartContext;

  const handleCloseModal = () => {
    setShowModal(false);
    setContentModal(modalMessages[0]);
  };

  const handleShowModal = () => setShowModal(true);

  const handleSaveCart = () => {
    saveCartInLocalStorage();
    handleShowModal();
    setContentModal(modalMessages[5]);
  };

  const cartDetailProps = { ...cartContext, handleSaveCart };

  return (
    <main>
      <InfoBar title="MI CARRITO DE COMPRA">
        <img src={iconCart} alt="Mi Carrito" />
      </InfoBar>
      <div className="container-xl cartDetailContainer">
        {cart.length > 0 ? (
          <CartDetail {...cartDetailProps} />
        ) : (
          <EmptyCart
            setCart={setCart}
            handleShowModal={handleShowModal}
            setContentModal={setContentModal}
          />
        )}
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="cartModal"
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title>{contentModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{contentModal.msg1}</p>
          <p>{contentModal.msg2}</p>
          <p>{contentModal.msg3}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseModal}>
            Seguir
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Cart;
