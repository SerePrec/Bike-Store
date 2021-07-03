import React, { useState, useContext, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import CartDetail from "../../components/CartDetail";
import EmptyCart from "../../components/EmptyCart";
import InfoBar from "../../components/InfoBar";
import { getProducts } from "../../utils/getProducts";
import { modalMessages } from "../../utils/cartModalMessages";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  const cartContext = useContext(CartContext);

  const [savedCart, setSavedCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(modalMessages[0]);

  const { cart, setCart, saveCartInLocalStorage } = cartContext;

  const handleCloseModal = () => {
    setShowModal(false);
    setContentModal(modalMessages[0]);
  };

  const handleShowModal = () => setShowModal(true);

  const handleSaveCart = () => {
    saveCartInLocalStorage();
    handleShowModal();
    setContentModal(modalMessages[5]);
  };

  const getSavedCart = useCallback(() => {
    const localCart =
      localStorage.getItem("myMammothSavedCart") &&
      JSON.parse(localStorage.getItem("myMammothSavedCart"));
    //verifico que exista y sea de un formato válido
    if (
      localCart &&
      localCart.length > 0 &&
      localCart[0].product &&
      localCart[0].qty
    ) {
      setSavedCart(localCart);
      return true;
    } else {
      setSavedCart(null);
      return false;
    }
  }, []);

  const loadSavedCart = () => {
    setIsLoading(true);
    let modalMsg;
    const dataSavedCart = savedCart.map(elem => {
      return { id: elem.product.id, qty: elem.qty };
    });
    return getProducts()
      .then(res => {
        const checkedCart = [];
        res.forEach(product => {
          for (const data of dataSavedCart) {
            if (product.id === data.id && product.stock >= data.qty) {
              const qty = data.qty;
              checkedCart.push({ product, qty });
            }
          }
        });
        setCart(checkedCart);
        localStorage.removeItem("myMammothSavedCart");
        if (savedCart.length === checkedCart.length) {
          modalMsg = modalMessages[1];
        } else if (checkedCart.length === 0) {
          modalMsg = modalMessages[3];
        } else {
          modalMsg = modalMessages[2];
        }
        setContentModal(modalMsg);
      })
      .catch(err => {
        setCart(null);
        setContentModal(modalMessages[4]);
        //setIsError(err);
        //setIsLoading(false);
      })
      .finally(() => {
        handleShowModal();
        setIsLoading(false);
        setSavedCart(null);
      });
  };

  const emptyCartProps = { getSavedCart, savedCart, loadSavedCart, isLoading };
  const cartDetailProps = { ...cartContext, handleSaveCart };

  return (
    <main>
      <InfoBar title="MI CARRITO DE COMPRA">
        <img src={iconCart} alt="Mi Carrito" />
      </InfoBar>
      <div className="container-xl cartDetailContainer">
        {cart.length > 0 ? (
          <CartDetail {...cartDetailProps} />
        ) : (
          <EmptyCart {...emptyCartProps} />
        )}
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="cartModal"
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
            Seguir
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Cart;
