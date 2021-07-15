import React from "react";
import { Table } from "react-bootstrap";
import ResumeRow from "../ResumeRow";
import { priceFormat } from "../../utils/priceFormat";
import "./SummaryTable.scss";

const SummaryTable = ({ cart, totPriceInCart }) => {
  return (
    <>
      <Table className="summaryTable animate__slideInUp">
        <tbody>
          {cart.map(elem => {
            const { product, qty } = elem;
            return <ResumeRow key={product.id} product={product} qty={qty} />;
          })}
        </tbody>
      </Table>
      <div className="subTot">
        <p>Total en productos ${priceFormat(totPriceInCart)}</p>
      </div>
    </>
  );
};

export default SummaryTable;
