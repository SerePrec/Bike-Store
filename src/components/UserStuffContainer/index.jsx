import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import FavsTable from "../FavsTable";
import Loader from "../Loader";
import MyAccountAlert from "../MyAccountAlert";
import OrdersTable from "../OrdersTable";
import SummaryOrderModal from "../SummaryOrderModal";
import { useModal } from "../../hooks/useModal";
import { getFirestore } from "../../firebase";
import iconOrder from "../../assets/img/clipboard-list.svg";
import iconHeart from "../../assets/img/heart-solid.svg";
import logoImg from "../../assets/img/logo.svg";
import iconSearch from "../../assets/img/icon_search_r.svg";
import "./UserStuffContainer.scss";

const UserStuffContainer = ({ userName }) => {
  const { totQtyInCart, totPriceInCart, checkInRange } =
    useContext(CartContext);
  const { isLoading, orders, getUsersOrders, favs, removeFav } =
    useContext(UserContext);
  const [isCartSaved, setIsCartSaved] = useState(false);
  const [section, setSection] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const {
    showModal,
    contentModal,
    setContentModal,
    handleShowModal,
    handleCloseModal
  } = useModal(null);

  useEffect(() => {
    if (!!localStorage.getItem("myMammothSavedCart")) setIsCartSaved(true);
  }, []);

  const getOrderById = id => {
    setModalLoading(true);
    handleShowModal();
    const db = getFirestore();
    const orders = db.collection("orders").doc(id);
    orders
      .get()
      .then(doc => {
        if (!doc.exist) {
          setContentModal(null);
        }
        setContentModal({ id: doc.id, ...doc.data() });
      })
      .catch(error => {
        console.error("Error obteniendo orden: ", error);
      })
      .finally(() => {
        setModalLoading(false);
      });
  };

  const myAccountAlertProps = {
    userName,
    isCartSaved,
    totQtyInCart,
    totPriceInCart,
    checkInRange
  };

  const summayModalProps = {
    showModal,
    contentModal,
    handleCloseModal,
    backdrop: "static",
    modalLoading
  };

  return (
    <div className="container-xl userStuffContainer">
      <div className="userStuff animate__zoomIn">
        <MyAccountAlert {...myAccountAlertProps}></MyAccountAlert>
        <Row noGutters>
          <Col md={4} className="userTools">
            <div
              onClick={() => {
                getUsersOrders();
                setSection("orders");
              }}
            >
              MIS ORDENES
              <img src={iconOrder} alt="" />
            </div>
            <div
              onClick={() => {
                setSection("favs");
              }}
            >
              MIS FAVORITOS
              <img src={iconHeart} alt="" />
            </div>
          </Col>
          <Col md={8} className="userToolsData">
            {isLoading && <Loader type="dots"></Loader>}
            {!isLoading && !section && (
              <div className="image">
                <img src={logoImg} alt="" />
              </div>
            )}
            {!isLoading &&
              section === "orders" &&
              (orders.length > 0 ? (
                <OrdersTable
                  orders={orders}
                  getOrderById={getOrderById}
                ></OrdersTable>
              ) : (
                <div className="emptyResults">
                  <img src={iconSearch} alt="Lupa" />
                  <h3>No hay resultados para mostrar</h3>
                </div>
              ))}
            {!isLoading &&
              section === "favs" &&
              (favs.length > 0 ? (
                <FavsTable favs={favs} removeFav={removeFav}></FavsTable>
              ) : (
                <div className="emptyResults">
                  <img src={iconSearch} alt="Lupa" />
                  <h3>No hay productos en tu lista de favoritos</h3>
                </div>
              ))}
          </Col>
        </Row>
      </div>
      <SummaryOrderModal {...summayModalProps}></SummaryOrderModal>
    </div>
  );
};

export default UserStuffContainer;
