import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import SummaryTable from "../SummaryTable";
import { priceFormat } from "../../utils/priceFormat";
import "./SummaryOrderModal.scss";

const SummaryOrderModal = ({
  showModal,
  handleCloseModal,
  contentModal,
  backdrop,
  modalLoading
}) => {
  const data = contentModal || {};
  const { id, date, shipment, items, total, subtotals } = data;

  return (
    <Modal
      show={showModal}
      backdrop={backdrop}
      dialogClassName="summaryOrderModal"
      scrollable
      centered
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Resúmen de orden</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {modalLoading || !items ? (
          <div className="loading">
            <h4>Cargando....</h4>
            <Spinner animation="grow" variant="dark" />
          </div>
        ) : (
          <div className="detail">
            <p>
              <b>Id: </b>
              {id}
            </p>
            <p>
              <b>Fecha:</b>
              {date.toDate().toLocaleString()}
            </p>
            <p>
              <b>Tipo de envio: </b>
              {shipment.type}
            </p>
            <SummaryTable
              cart={items}
              totPriceInCart={subtotals.productsSub}
            ></SummaryTable>
            <div className="subTot">
              <p>
                Gastos de envio{" "}
                <span>${priceFormat(subtotals.shipmentSub)}</span>
              </p>
              <p>
                Gastos financieros{" "}
                <span>${priceFormat(subtotals.financialSub)}</span>
              </p>
              <i>
                {subtotals.partials === "1"
                  ? `Pago en 1 cuota`
                  : `Pago en ${subtotals.partials} cuotas`}
              </i>
            </div>
            <h3 className="total">
              Total: <span>${priceFormat(total)}</span>
            </h3>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseModal}>
          Seguir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SummaryOrderModal;
