import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./UserModal.scss";

const UserModal = ({ showModal, handleCloseModal, contentModal, backdrop }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop={backdrop}
      dialogClassName="userModal"
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
          Cerrar
        </Button>
        <Button as={Link} to="/myaccount" variant="danger">
          Registrate...
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
