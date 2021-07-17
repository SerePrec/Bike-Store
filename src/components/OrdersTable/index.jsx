import React from "react";
import { Table } from "react-bootstrap";
import { priceFormat } from "../../utils/priceFormat";
import "./OrdersTable.scss";

const OrdersTable = ({ orders, getOrderById }) => {
  return (
    <Table className="ordersTable" striped>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>FECHA</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(elem => {
          return (
            <tr key={elem.orderId} onClick={() => getOrderById(elem.orderId)}>
              <td>{elem.orderId}</td>
              <td>{elem.date.toDate().toLocaleString()}</td>
              <td>{priceFormat(elem.total)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrdersTable;
