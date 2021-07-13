import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import InfoMessage from "../InfoMessage";
import TypicButton from "../TypicButton";
import "./ItemCount.scss";

const ItemCount = ({ stock, initial, onAdd, inCart }) => {
  const [quantity, setQuantity] = useState(initial);
  const [alertStockLimit, setAlertStockLimit] = useState(false);

  useEffect(() => {
    if (alertStockLimit) {
      let temp;
      temp = setTimeout(() => {
        setAlertStockLimit(false);
      }, 3000);

      return () => {
        clearInterval(temp);
      };
    }
  }, [alertStockLimit]);

  const handleChange = e => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) {
      alertStockLimit && setAlertStockLimit(false);
      setQuantity(parseInt(valor) || valor);
    }
  };

  const handleClickSuma = () => {
    if (quantity > 0 && quantity < stock) {
      setQuantity(quantity => quantity + 1);
    } else if (quantity >= stock) {
      setAlertStockLimit(true);
      setQuantity(stock);
    } else {
      setQuantity(1);
    }
  };

  const handleClickResta = () => {
    alertStockLimit && setAlertStockLimit(false);
    if (quantity > 1 && quantity <= stock) {
      setQuantity(quantity => quantity - 1);
    } else if (quantity > stock) {
      setQuantity(stock);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="itemCount">
      {stock > 0 && (
        <InputGroup className="mb-3" size={inCart && "sm"}>
          <InputGroup.Prepend>
            <Button variant="outline-secondary" onClick={handleClickResta}>
              -
            </Button>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            value={quantity}
            onChange={handleChange}
            aria-label="Cantidad del producto"
            className="text-center"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleClickSuma}>
              +
            </Button>
          </InputGroup.Append>
        </InputGroup>
      )}
      {!(quantity > 0) && (
        <InfoMessage
          msg={`Introduzca una cantidad válida`}
          type="warning"
          animation="animate__slideInUp"
        />
      )}
      {quantity > stock && (
        <InfoMessage
          msg={`Stock insuficiente.${
            stock >= 0 ? ` Disponible ${stock}u` : " Revisa disponibilidad"
          }`}
          type="danger"
          animation="animate__slideInUp"
        />
      )}
      {alertStockLimit && (
        <InfoMessage
          msg={`No puedes aumentar la cantidad. Stock insuficiente`}
          type="warning"
          animation="animate__slideInUp"
        />
      )}
      {stock > 0 && (
        <TypicButton
          className={`font-weight-bold ${
            inCart && quantity === initial ? "hidden" : ""
          }`}
          size={inCart && "sm"}
          block
          onClick={
            quantity > 0 && quantity <= stock ? () => onAdd(quantity) : null
          }
          disabled={!(quantity > 0 && quantity <= stock)}
        >
          {!inCart ? "Añadir al Carrito" : "Actualizar"}
        </TypicButton>
      )}
    </div>
  );
};

export default ItemCount;
