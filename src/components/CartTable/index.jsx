import React from "react";
import { Table } from "react-bootstrap";
import CartRow from "../CartRow";
import { priceFormat } from "../../utils/priceFormat";
import "./CartTable.scss";

const CartTable = ({
  cart,
  removeFromCart,
  updateFromCart,
  totPriceInCart
}) => {
  return (
    <Table className="cartTable">
      <thead className="table-dark">
        <tr>
          <th></th>
          <th scope="col" colSpan="2">
            PRODUCTO
          </th>
          <th className="text-center" scope="col">
            CANTIDAD
          </th>
          <th className="text-right" scope="col">
            SUBTOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        {cart.map(elem => {
          const { product, qty } = elem;
          return (
            <CartRow
              key={product.id}
              product={product}
              qty={qty}
              removeFromCart={removeFromCart}
              updateFromCart={updateFromCart}
            />
          );
        })}
      </tbody>
      <tfoot className="table-dark">
        <tr>
          <td colSpan={3} className="text-right font-weight-bold">
            <p>TOTAL</p>
          </td>
          <td className="text-center font-weight-bold">
            <p>TOTAL</p>
            <p>${priceFormat(totPriceInCart)}</p>
          </td>
          <td className="text-right font-weight-bold">
            ${priceFormat(totPriceInCart)}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default CartTable;
