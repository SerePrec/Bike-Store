import React from "react";
import { Row, Table } from "react-bootstrap";
import ItemCount from "../ItemCount";
import TypicButton from "../TypicButton";
import trash from "../../assets/img/trash.svg";
import times from "../../assets/img/times-circle.svg";
import "./CartDetail.scss";

const CartDetail = () => {
  return (
    <div className="cartDetail">
      <Row noGutters className="mb-2">
        <p>Tienes xx productos</p>
      </Row>
      <TypicButton className="mb-3 mx-auto soft">
        VACIAR CARRITO <img src={trash} alt="" />
      </TypicButton>
      <Row noGutters>
        <Table>
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
            <tr>
              <td>
                <img src={times} alt="" />
              </td>
              <td>
                <img
                  src="/img/producto68.jpg"
                  className="card-img-top"
                  alt=""
                />
              </td>
              <td>
                <p>Mochila Camelback Mini Mule 1.5L</p>
                <p>
                  <b>Precio: $5.621,10</b>
                  <del>$xxxx.xx</del>
                </p>
                <p>
                  <b>SUBTOTAL: $x.xxx,xx</b>
                </p>
              </td>
              <td className="text-center">
                {" "}
                <ItemCount stock={3} initial={3} cart />
              </td>
              <td className="text-right font-weight-bold">$x.xxx,xx</td>
            </tr>
            <tr>
              <td>
                <img src={times} alt="" />
              </td>
              <td>
                <img
                  src="/img/producto49.jpg"
                  className="card-img-top"
                  alt=""
                />
              </td>
              <td>
                <p>
                  Pulsómetro De Bicicleta Bryton Rider 750 T Cadencia, FC Y
                  Veloc.
                </p>
                <p>
                  <b>Precio: $33.900,00</b>
                  <del>$xxxx.xx</del>
                </p>
                <p>
                  <b>SUBTOTAL: $xx.xxx,xx</b>
                </p>
              </td>
              <td className="text-center">
                <ItemCount stock={5} initial={1} cart />
              </td>
              <td className="text-right font-weight-bold">$xx.xxx,xx</td>
            </tr>
          </tbody>
          <tfoot className="table-dark">
            <tr>
              <td colSpan={3} className="text-right font-weight-bold">
                <p>TOTAL</p>
              </td>
              <td className="text-center font-weight-bold">
                <p>TOTAL</p>
                <p>$xx.xxx,xx</p>
              </td>
              <td className="text-right font-weight-bold">$xx.xxx,xx</td>
            </tr>
          </tfoot>
        </Table>
      </Row>
    </div>
  );
};

export default CartDetail;
