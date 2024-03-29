import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CartModal.scss";

const CartModal = ({ showModal, handleCloseModal, contentModal, backdrop }) => {
  return (
    <Modal show={showModal} backdrop={backdrop} dialogClassName="cartModal">
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
  );
};

export default CartModal;
