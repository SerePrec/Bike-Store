import React, { useContext, useState } from "react";
import { Row, Col, Table, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import InfoBar from "../../components/InfoBar";
import ResumeRow from "../../components/ResumeRow";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { useSetForm } from "../../hooks/useSetForm";
import check from "../../assets/img/check.svg";
import cartIcon from "../../assets/img/icon_cart2.png";
import "./Checkout.scss";

import { priceFormat } from "../../utils/priceFormat";
import { pricePartialPay, getInt } from "../../utils/taxes";
import TypicButton from "../../components/TypicButton";

import houseIcon from "../../assets/img/casa.svg";
import truckIcon from "../../assets/img/camion.svg";
import { fakeShipment } from "../../utils/fakeShipment";

const Checkout = () => {
  const { cart, totQtyInCart, totPriceInCart, checkInRange } =
    useContext(CartContext);
  const { authUser } = useContext(UserContext);

  const [validated, setValidated] = useState(false);

  const { form, handleChange } = useSetForm({
    name: "",
    phone: "",
    email: authUser.email,
    adress: "",
    cp: "",
    partialsQty: "1",
    cardNum1: "",
    cardNum2: "",
    cardNum3: "",
    cardNum4: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCVV: ""
  });

  const { form: form2, handleChange: handleChange2 } = useSetForm({
    shipment: "1"
  });

  const handleSubmit = (e, form) => {
    e.preventDefault();
    const regForm = e.currentTarget;
    if (regForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    alert("A PAGAR....");
  };

  const shipmentCost = fakeShipment(cart);
  let totalPrice =
    form2.shipment === "1" ? totPriceInCart + shipmentCost : totPriceInCart;

  if (!(totQtyInCart > 0 && checkInRange))
    return <Redirect to="/cart"></Redirect>;
  return (
    <main>
      <InfoBar title="CHECKOUT"></InfoBar>

      <div className="container-xl px-0 animate__zoomIn">
        <Row className="checkout mx-0 mr-md-n3">
          <Col md={5} className="resume">
            <h3>Resumen de compra</h3>
            <Table className="animate__slideInUp">
              <tbody>
                {cart.map(elem => {
                  const { product, qty } = elem;
                  return (
                    <ResumeRow key={product.id} product={product} qty={qty} />
                  );
                })}
              </tbody>
            </Table>
            <div className="subTot">
              <p>Total en productos ${priceFormat(totPriceInCart)}</p>
            </div>
            <h4>Envío</h4>

            <Form.Group as={Row} className="shipment">
              <Col sm={12}>
                <Form.Check
                  type="radio"
                  name="shipment"
                  value="1"
                  label={
                    <>
                      <div>
                        <img src={truckIcon} alt="" />
                        Envío a domicilio
                      </div>
                      <span>
                        {shipmentCost > 0
                          ? `$${priceFormat(shipmentCost)}`
                          : "GRATIS"}
                      </span>
                    </>
                  }
                  checked={form2.shipment === "1"}
                  onChange={handleChange2}
                  id="inputRadioA"
                />
                <Form.Check
                  type="radio"
                  name="shipment"
                  value="0"
                  label={
                    <>
                      <div>
                        <img src={houseIcon} alt="" />
                        Retiro por sucursal
                      </div>
                      <span>GRATIS</span>
                    </>
                  }
                  checked={form2.shipment === "0"}
                  onChange={handleChange2}
                  id="inputRadioB"
                />
              </Col>
            </Form.Group>
            <div className="subTot">
              <p>
                Costo de envío $
                {form2.shipment === "1" ? priceFormat(shipmentCost) : "0,00"}
              </p>
            </div>
            <div className="totalPrice">
              <p>
                TOTAL DE COMPRA <span>${priceFormat(totalPrice)}</span>
              </p>
            </div>
          </Col>

          <Col md={7}>
            <Form
              noValidate
              validated={validated}
              onSubmit={e => {
                handleSubmit(e, form);
              }}
              className="checkoutForm "
            >
              <Form.Group as={Row} controlId="inputName">
                <Form.Label column sm="2">
                  Nombre y Apellido
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Ingresa tu nombre y apellido"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Completa este campo.
                  </Form.Control.Feedback>
                  <Form.Text>Con estos datos se hará la facturación.</Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="inputPhone">
                <Form.Label column sm="2">
                  Teléfono
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="phone"
                    value={form.phone}
                    placeholder="Ingresa un teléfono de contacto"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Completa este campo.
                  </Form.Control.Feedback>
                  <Form.Text>
                    Puede que necesitemos contactarnos por tu compra.
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="inputEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Ingresa tu email"
                    onChange={handleChange}
                    required
                    disabled
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Introduce una dirección de email válida.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <div
                className={`optional ${
                  form2.shipment !== "1" ? "disabled" : ""
                }`}
              >
                <Form.Group as={Row} controlId="inputAdress">
                  <Form.Label column sm="2">
                    Dirección
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      name="adress"
                      value={form.adress}
                      placeholder="Ingresa tu dirección COMPLETA"
                      onChange={handleChange}
                      required={form2.shipment === "1"}
                      disabled={form2.shipment !== "1"}
                    />
                    <Form.Control.Feedback type="invalid">
                      Completa este campo.
                    </Form.Control.Feedback>
                    <Form.Text>
                      Es la dirección a la que enviaremos tu pedido
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="inputCP">
                  <Form.Label column xs="2">
                    Código Postal
                  </Form.Label>
                  <Col xs="5">
                    <Form.Control
                      type="text"
                      name="cp"
                      value={form.cp}
                      placeholder="Ingresa el CP"
                      onChange={handleChange}
                      required={form2.shipment === "1"}
                      disabled={form2.shipment !== "1"}
                    />
                    <Form.Control.Feedback type="invalid">
                      Completa este campo.
                    </Form.Control.Feedback>
                    <Form.Text>CP de la dirección de envío</Form.Text>
                  </Col>
                </Form.Group>
              </div>
              <fieldset className="py-3 partialPayments">
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2} className="pt-0 pr-0">
                    Cuotas
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label={<span>1 Cuota de ${priceFormat(totalPrice)}</span>}
                      name="partialsQty"
                      value="1"
                      checked={form.partialsQty === "1"}
                      onChange={handleChange}
                      id="inputRadio1"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          <span>
                            3 Cuotas de $
                            {priceFormat(pricePartialPay(totalPrice, 3).part)}
                          </span>
                          <i>
                            {" "}
                            (Int.: {getInt(3)}%) Total: $
                            {priceFormat(pricePartialPay(totalPrice, 3).tot)}
                          </i>
                        </>
                      }
                      name="partialsQty"
                      value="3"
                      checked={form.partialsQty === "3"}
                      onChange={handleChange}
                      id="inputRadio2"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          <span>
                            6 Cuotas de $
                            {priceFormat(pricePartialPay(totalPrice, 6).part)}
                          </span>
                          <i>
                            {" "}
                            (Int.:{getInt(6)}%) Total: $
                            {priceFormat(pricePartialPay(totalPrice, 6).tot)}
                          </i>
                        </>
                      }
                      name="partialsQty"
                      value="6"
                      checked={form.partialsQty === "6"}
                      onChange={handleChange}
                      id="inputRadio3"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          <span>
                            12 Cuotas de $
                            {priceFormat(pricePartialPay(totalPrice, 12).part)}
                          </span>
                          <i>
                            {" "}
                            (Int.: {getInt(12)}%) Total: $
                            {priceFormat(pricePartialPay(totalPrice, 12).tot)}
                          </i>
                        </>
                      }
                      name="partialsQty"
                      value="12"
                      checked={form.partialsQty === "12"}
                      onChange={handleChange}
                      id="inputRadio4"
                    />
                    <Form.Check
                      type="radio"
                      label={
                        <>
                          <span>
                            18 Cuotas de $
                            {priceFormat(pricePartialPay(totalPrice, 18).part)}
                          </span>
                          <i>
                            {" "}
                            (Int.: {getInt(18)}%) Total: $
                            {priceFormat(pricePartialPay(totalPrice, 18).tot)}
                          </i>
                        </>
                      }
                      name="partialsQty"
                      value="18"
                      checked={form.partialsQty === "18"}
                      onChange={handleChange}
                      id="inputRadio5"
                    />
                  </Col>
                </Form.Group>
              </fieldset>

              <fieldset className="form-group creditCard">
                <legend className="col-form-label">Datos de su tarjeta</legend>
                <Form.Group as={Row} className="justify-content-center py-2">
                  <Form.Label column xs="2">
                    Número
                  </Form.Label>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardNum1"
                      value={form.cardNum1}
                      placeholder="XXXX"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="4"
                      pattern="[0-9]{4}"
                      title="4 números"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardNum2"
                      value={form.cardNum2}
                      placeholder="XXXX"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="4"
                      pattern="[0-9]{4}"
                      title="4 números"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardNum3"
                      value={form.cardNum3}
                      placeholder="XXXX"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="4"
                      pattern="[0-9]{4}"
                      title="4 números"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardNum4"
                      value={form.cardNum4}
                      placeholder="XXXX"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="4"
                      pattern="[0-9]{4}"
                      title="4 números"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-center py-2">
                  <Col xs="10" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardName"
                      value={form.cardName}
                      placeholder="Ingrese su nombre tal cual figura en su tarjeta"
                      onChange={handleChange}
                      className="text-center"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completa este campo.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-center py-2">
                  <Form.Label column xs="2">
                    Vto
                  </Form.Label>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardMonth"
                      value={form.cardMonth}
                      placeholder="MM"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="2"
                      pattern="(0[0-9]|1[0-2])"
                      title="Mes Formato MM"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="2" className="px-1">
                    <Form.Control
                      type="text"
                      name="cardYear"
                      value={form.cardYear}
                      placeholder="YY"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="2"
                      pattern="(2[1-9]|[3-9][0-9])"
                      title="Mes Formato YY"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="3" className="offset-1 px-1">
                    <Form.Control
                      type="password"
                      name="cardCVV"
                      value={form.cardCVV}
                      placeholder="CVV"
                      onChange={handleChange}
                      className="text-center"
                      maxLength="3"
                      pattern="[0-9]{3}"
                      title="3 números"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Completar
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </fieldset>
              <Form.Group as={Row} className="mt-3">
                <TypicButton
                  as={Link}
                  to="/cart"
                  className="black font-weight-bold"
                >
                  VOLVER AL
                  <img src={cartIcon} alt="" />
                </TypicButton>
                <TypicButton type="submit" className="font-weight-bold">
                  CONFIRMAR Y PAGAR
                  <img src={check} alt="" />
                </TypicButton>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Checkout;
