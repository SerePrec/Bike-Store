import React, { useContext, useState } from "react";
import { Row, Col, Table, Form } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
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
import CartModal from "../../components/CartModal";
import { useModal } from "../../hooks/useModal";
import { modalMessages } from "../../utils/modalMessages";
import LoaderModal from "../../components/LoaderModal";
import { fieldPathId, getFirestore, firestoreTimeStamp } from "../../firebase";
import { useRef } from "react";
import OrderModal from "../../components/OrderModal";

const Checkout = () => {
  const { cart, setCart, totQtyInCart, totPriceInCart, checkInRange } =
    useContext(CartContext);
  const { authUser } = useContext(UserContext);

  const [validated, setValidated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isError, setIsError] = useState(null);
  let history = useHistory();

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

  const active = useRef(false);
  const revertStockData = useRef([]);

  const {
    showModal,
    contentModal,
    setContentModal,
    handleShowModal,
    handleCloseModal
  } = useModal(modalMessages[0]);

  const {
    showModal: showModalLoad,
    contentModal: contentModalLoad,
    setContentModal: setContentModalLoad,
    handleShowModal: handleShowModalLoad,
    handleCloseModal: handleCloseModalLoad
  } = useModal({ title: "" });

  const {
    showModal: showModalOrder,
    contentModal: contentModalOrder,
    setContentModal: setContentModalOrder,
    handleShowModal: handleShowModalOrder,
    handleCloseModal: handleCloseModalOrder
  } = useModal(modalMessages[0]);

  const shipmentCost = fakeShipment(cart);
  let totalPrice =
    form2.shipment === "1" ? totPriceInCart + shipmentCost : totPriceInCart;

  const goCart = () => {
    active.current = false;
    handleCloseModal();
  };

  const goHome = () => {
    handleCloseModal();
    history.push("/");
  };

  const validateCart = () => {
    setContentModalLoad({ title: "Validando Productos" });
    handleShowModalLoad();
    let modalMsg;
    let outOfRange = false;
    const dataCart = cart.map(elem => {
      return { id: elem.product.id, qty: elem.qty };
    });
    const cartIds = dataCart.map(elem => elem.id);
    const db = getFirestore();
    const itemsCollection = db.collection("items");
    // Se fijo por validaciones previas la longitud máxima de productos diferentes del carrito a 10.
    const query = itemsCollection.where(fieldPathId(), "in", cartIds);
    return query
      .get()
      .then(querySnapshot => {
        const batch = db.batch();
        const checkedCart = [];
        const previousStockData = [];
        querySnapshot.docs.forEach(doc => {
          const match = dataCart.find(elem => elem.id === doc.id);
          if (doc.data().stock > 0) {
            const qty = match.qty;
            checkedCart.push({ product: { id: doc.id, ...doc.data() }, qty });
            if (doc.data().stock >= match.qty) {
              batch.update(doc.ref, { stock: doc.data().stock - match.qty });
              previousStockData.push({ ref: doc.ref, stock: doc.data().stock });
            } else {
              outOfRange = true;
            }
          }
        });
        if (!outOfRange && cart.length === checkedCart.length) {
          return batch.commit().then(() => {
            revertStockData.current = previousStockData;
            return Promise.resolve(true);
          });
        }
        if (cart.length === checkedCart.length) {
          modalMsg = modalMessages[9];
        } else if (checkedCart.length === 0) {
          modalMsg = modalMessages[12];
        } else {
          if (outOfRange) {
            modalMsg = modalMessages[10];
          } else {
            modalMsg = modalMessages[11];
          }
        }
        setContentModal(modalMsg);
        handleCloseModalLoad();
        setContentModalLoad({ title: "" });
        handleShowModal();
        setCart(checkedCart);
      })
      .catch(error => {
        setContentModal(modalMessages[13]);
        handleCloseModalLoad();
        setContentModalLoad({ title: "" });
        handleShowModal();
        console.error("Error Validando Carrito: ", error);
        return Promise.reject();
      });
  };

  const setRevertStock = () => {
    const db = getFirestore();
    const batch = db.batch();
    revertStockData.current.forEach(elem => {
      batch.update(elem.ref, { stock: elem.stock });
    });
    batch.commit();
  };

  const fakePayment = () => {
    setContentModalLoad({ title: "Procesando Pago" });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("ok");
        //reject("error de pago");
      }, 2000);
    })
      .then(() => {
        setContentModalLoad({ title: "Pago Aprobado" });
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      })
      .catch(error => {
        setContentModalOrder({
          title: "No pudimos validar tu pago",
          msg1: "Algo salió mal durante el proceso",
          msg2: "Verifica los datos y saldo de tu tarjeta e intentalo nuevamente o en unos minutos",
          msg3: "Disculpa las molestias."
        });
        setRevertStock();
        setIsError(true);
        handleCloseModalLoad();
        setContentModalLoad({ title: "" });
        handleShowModalOrder();
        console.error("Hubo un error en el proceso de pago:", error);
      });
  };

  const createOrder = () => {
    const userInfo = {
      name: form.name,
      phone: form.phone,
      email: authUser.email
    };
    const simplifyCart = cart.map(elem => {
      const { product, qty } = elem;
      const { id, title, pictureURL, price } = product;
      const simplifyProduct = { id, title, pictureURL, price };
      return { product: simplifyProduct, qty };
    });
    const shipmentInfo =
      form2.shipment === "1"
        ? { type: "Envío a domicilio", adress: form.adress, cp: form.cp }
        : { type: "Retiro por sucursal" };

    const subtotals = {
      productsSub: totPriceInCart,
      shipmentSub: form2.shipment === "1" ? shipmentCost : 0,
      financialSub: (getInt(parseInt(form.partialsQty)) / 100) * totalPrice
    };

    const newOrder = {
      buyer: userInfo,
      items: simplifyCart,
      shipment: shipmentInfo,
      total: pricePartialPay(totalPrice, parseInt(form.partialsQty)).tot,
      subtotals,
      date: firestoreTimeStamp(new Date())
    };

    const db = getFirestore();
    const orders = db.collection("orders");
    const userOrders = db
      .collection("users")
      .doc(authUser.uid)
      .collection("orders");
    return orders
      .add(newOrder)
      .then(({ id }) => {
        setOrderId(id);
        setCart([]);
        return userOrders
          .doc(id)
          .set({ orderId: id, total: newOrder.total, date: newOrder.date })
          .then(() => {
            setContentModalOrder({
              title: "Compra Registrada!",
              msg1: "Tu compra finalizó con éxito y fue registrada con el identificador",
              msg2: `${id}`,
              msg3: "Más adelante podrás consultar tus órdenes en la sección MI CUENTA"
            });
          })
          .catch(error => {
            setContentModalOrder({
              title: "Compra Registrada!",
              msg1: "Tu compra fue registrada con el identificador",
              msg2: `${id}`,
              msg3: "Pero ocurrió un error que impidió registrarla en tu historial. Cualquier consulta al respecto, puedes comunicarte con nosotros a través de los canales oficiales."
            });
            console.error("Error guardando en usuario: ", error);
          })
          .finally(() => {
            handleCloseModalLoad();
            setContentModalLoad({ title: "" });
            handleShowModalOrder();
          });
      })
      .catch(error => {
        console.error("Error creando orden: ", error);
        return Promise.reject(error);
      });
  };

  const handleSubmit = (e, form) => {
    e.preventDefault();
    active.current = true;
    const regForm = e.currentTarget;
    if (regForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    // Validando disponibilidad
    validateCart()
      .then(res => {
        //simulando pago
        if (res === true) {
          return fakePayment();
        }
      })
      .then(res => {
        // generando orden
        if (res === "ok") {
          return createOrder();
        }
      })
      .catch(error => {
        setContentModalOrder({
          title: "No pudimos registrar tu pedido",
          msg1: "Algo salió mal durante el proceso",
          msg2: "No te preocupes si tu pago fue aprobado, ya reservamos tus productos. Comunicate con nosotros para solucionarlo a la brevedad",
          msg3: "Disculpa las molestias."
        });
        setIsError(true);
        handleCloseModalLoad();
        setContentModalLoad({ title: "" });
        handleShowModalOrder();
        console.error("Hubo un error en el procesamiento del pedido :", error);
      });
  };

  const cartModalProps = {
    showModal,
    handleCloseModal: goCart,
    contentModal,
    backdrop: "static"
  };

  const orderModalProps = {
    showModal: showModalOrder,
    handleCloseModal: orderId ? goHome : handleCloseModalOrder,
    contentModal: contentModalOrder,
    error: !!isError,
    backdrop: "static"
  };

  if (!((totQtyInCart > 0 && checkInRange) || active.current))
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
      <LoaderModal
        showModal={showModalLoad}
        contentModal={contentModalLoad}
      ></LoaderModal>
      <CartModal {...cartModalProps} />
      <OrderModal {...orderModalProps} />
    </main>
  );
};

export default Checkout;
