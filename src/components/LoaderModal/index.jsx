import React from "react";
import { Modal } from "react-bootstrap";
import Loader from "../Loader";
import "./LoaderModal.scss";

const LoaderModal = ({ showModal, contentModal }) => {
  return (
    <Modal
      show={showModal}
      backdrop="static"
      size="sm"
      centered
      dialogClassName="loaderModal"
    >
      <Modal.Body className="text-center">
        <Loader message={{ title: contentModal.title }}></Loader>
      </Modal.Body>
    </Modal>
  );
};

export default LoaderModal;
