import { useState, useRef } from "react";
import { useModal } from "./useModal";
import { pricePartialPay, getInt } from "../utils/taxes";
import { cartModalMessages, orderModalMessages } from "../utils/modalMessages";
import {
  fieldPathId,
  getFirestore,
  firestoreTimeStamp,
  fieldValue
} from "../firebase";

export const useConfirmOrder = ({
  cartContext,
  authUser,
  shipmentForm,
  shipmentCost,
  totalPrice
}) => {
  const [orderId, setOrderId] = useState(null);
  const [isError, setIsError] = useState(null);
  const active = useRef(false);
  const revertStockData = useRef([]);

  const {
    showModal: showCartModal,
    contentModal: contentCartModal,
    setContentModal: setContentCartModal,
    handleShowModal: handleShowCartModal
  } = useModal(cartModalMessages[0]);

  const {
    showModal: showLoaderModal,
    contentModal: contentLoaderModal,
    setContentModal: setContentLoaderModal,
    handleShowModal: handleShowLoaderModal,
    handleCloseModal: handleCloseLoaderModal
  } = useModal({ title: "" });

  const {
    showModal: showOrderModal,
    contentModal: contentOrderModal,
    setContentModal: setContentOrderModal,
    handleShowModal: handleShowOrderModal,
    handleCloseModal: handleCloseOrderModal
  } = useModal(orderModalMessages[0]);

  const { cart, setCart, totPriceInCart } = cartContext;

  const validateCart = () => {
    setContentLoaderModal({ title: "Validando Productos..." });
    handleShowLoaderModal();
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
        // PRUEBA DE ERROR VALIDANDO CARRITO *****
        //return Promise.reject("Error");
        const batch = db.batch();
        const checkedCart = [];
        const previousStockData = [];
        querySnapshot.docs.forEach(doc => {
          const match = dataCart.find(elem => elem.id === doc.id);
          if (doc.data().stock > 0) {
            const qty = match.qty;
            checkedCart.push({ product: { id: doc.id, ...doc.data() }, qty });
            if (doc.data().stock >= match.qty) {
              batch.update(doc.ref, {
                stock: doc.data().stock - match.qty,
                sales: doc.data().sales + match.qty
              });
              previousStockData.push({ ref: doc.ref, qty: match.qty });
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
          modalMsg = cartModalMessages[9];
        } else if (checkedCart.length === 0) {
          modalMsg = cartModalMessages[12];
        } else {
          if (outOfRange) {
            modalMsg = cartModalMessages[10];
          } else {
            modalMsg = cartModalMessages[11];
          }
        }
        setContentCartModal(modalMsg);
        handleCloseLoaderModal();
        setContentLoaderModal({ title: "" });
        handleShowCartModal();
        setCart(checkedCart);
      })
      .catch(error => {
        setContentCartModal(cartModalMessages[13]);
        handleCloseLoaderModal();
        setContentLoaderModal({ title: "" });
        handleShowCartModal();
        console.error("Error Validando Carrito: ", error);
      });
  };

  const setRevertStock = () => {
    const db = getFirestore();
    const batch = db.batch();
    revertStockData.current.forEach(elem => {
      batch.update(elem.ref, {
        stock: fieldValue().increment(elem.qty),
        sales: fieldValue().increment(-elem.qty)
      });
    });
    batch.commit();
  };

  const fakePayment = () => {
    setContentLoaderModal({ title: "Procesando Pago..." });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // PRUEBA DE RECHAZO DE PAGO *****
        //reject("error de pago");
        resolve("ok");
      }, 2000);
    })
      .then(() => {
        setContentLoaderModal({ title: "Pago Aprobado" });
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      })
      .catch(error => {
        setContentOrderModal(orderModalMessages[3]);
        setRevertStock();
        setIsError(true);
        handleCloseLoaderModal();
        setContentLoaderModal({ title: "" });
        handleShowOrderModal();
        console.error("Hubo un error en el proceso de pago:", error);
      });
  };

  const createOrder = form => {
    const userInfo = {
      name: form.name,
      phone: form.phone,
      email: authUser.email
    };
    const simplifyCart = cart.map(elem => {
      const { product, qty } = elem;
      const { id, title, pictureURL, price, discount } = product;
      const simplifyProduct = { id, title, pictureURL, price, discount };
      return { product: simplifyProduct, qty };
    });
    const shipmentInfo =
      shipmentForm.shipment === "1"
        ? { type: "Envío a domicilio", adress: form.adress, cp: form.cp }
        : { type: "Retiro por sucursal" };

    const subtotals = {
      productsSub: totPriceInCart,
      shipmentSub: shipmentForm.shipment === "1" ? shipmentCost : 0,
      financialSub: (getInt(parseInt(form.partialsQty)) / 100) * totalPrice,
      partials: form.partialsQty
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
        // PRUEBA DE ERROR CREANDO ORDEN *****
        //return Promise.reject("Error");
        setOrderId(id);
        setCart([]);
        return userOrders
          .doc(id)
          .set({ orderId: id, total: newOrder.total, date: newOrder.date })
          .then(() => {
            // PRUEBA DE ERROR GUARDANDO ORDEN EN USUARIO *****
            //return Promise.reject("Error");
            setContentOrderModal({ ...orderModalMessages[1], msg2: `${id}` });
          })
          .catch(error => {
            setContentOrderModal({ ...orderModalMessages[2], msg2: `${id}` });
            console.error("Error guardando orden en usuario: ", error);
          })
          .finally(() => {
            handleCloseLoaderModal();
            setContentLoaderModal({ title: "" });
            handleShowOrderModal();
          });
      })
      .catch(error => {
        console.error("Error creando orden: ", error);
        return Promise.reject(error);
      });
  };

  const confirmOrder = form => {
    active.current = true;
    setIsError(false);
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
          return createOrder(form);
        }
      })
      .catch(error => {
        setContentOrderModal(orderModalMessages[4]);
        setIsError(true);
        handleCloseLoaderModal();
        setContentLoaderModal({ title: "" });
        handleShowOrderModal();
        console.error("Hubo un error en el procesamiento del pedido :", error);
      });
  };

  return {
    active,
    orderId,
    isError,
    contentLoaderModal,
    showLoaderModal,
    contentCartModal,
    showCartModal,
    showOrderModal,
    contentOrderModal,
    handleCloseOrderModal,
    confirmOrder
  };
};
