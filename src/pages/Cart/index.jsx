import React, { useState, useContext, useCallback } from "react";
import { CartContext } from "../../context/CartContext";
import CartDetail from "../../components/CartDetail";
import CartModal from "../../components/CartModal";
import EmptyCart from "../../components/EmptyCart";
import InfoBar from "../../components/InfoBar";
import { modalMessages } from "../../utils/cartModalMessages";
import { getFirestore, fieldPathId } from "../../firebase";
import iconCart from "../../assets/img/icon_cart2.png";
import "./Cart.scss";

const Cart = () => {
  const cartContext = useContext(CartContext);

  const [savedCart, setSavedCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    const savedCartIds = dataSavedCart.map(elem => elem.id);
    const db = getFirestore();
    const itemsCollection = db.collection("items");

    //FIXME: Si va a quedar este tipo de consulta en lugar de traer todo,
    // fijar la longitud máxima de productos diferentes del carrito a 10
    const query = itemsCollection.where(fieldPathId(), "in", savedCartIds);
    query
      .get()
      .then(querySnapshot => {
        const checkedCart = [];
        querySnapshot.docs.forEach(doc => {
          const match = dataSavedCart.find(elem => elem.id === doc.id);
          if (doc.data().stock >= match.qty) {
            const qty = match.qty;
            checkedCart.push({ product: { id: doc.id, ...doc.data() }, qty });
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
      .catch(error => {
        setContentModal(modalMessages[4]);
      })
      .finally(() => {
        handleShowModal();
        setIsLoading(false);
        setSavedCart(null);
      });
  };

  const cartDetailProps = { ...cartContext, handleSaveCart };
  const emptyCartProps = { getSavedCart, savedCart, loadSavedCart, isLoading };
  const cartModalProps = { showModal, handleCloseModal, contentModal };

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
      <CartModal {...cartModalProps} />
    </main>
  );
};

export default Cart;
