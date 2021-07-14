import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./OrderModal.scss";

const OrderModal = ({
  showModal,
  handleCloseModal,
  contentModal,
  error,
  backdrop
}) => {
  return (
    <Modal
      show={showModal}
      backdrop={backdrop}
      dialogClassName={`orderModal ${error ? "error" : ""}`}
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>{contentModal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>{contentModal.msg1}</p>
        <p>{contentModal.msg2}</p>
        <p>{contentModal.msg3}</p>
        {!error && <p>Muchas Gracias por tu compra!</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseModal}>
          Seguir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
