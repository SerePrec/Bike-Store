import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import InfoMessage from "../InfoMessage";
import "./ItemCount.scss";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);
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
      setAlertStockLimit && setAlertStockLimit(false);
      setCount(parseInt(valor) || valor);
    }
  };

  const handleClickSuma = () => {
    if (count > 0 && count < stock) {
      setCount(count => count + 1);
    } else if (count >= stock) {
      setAlertStockLimit(true);
      setCount(stock);
    } else {
      setCount(1);
    }
  };

  const handleClickResta = () => {
    setAlertStockLimit && setAlertStockLimit(false);
    if (count > 1 && count <= stock) {
      setCount(count => count - 1);
    } else if (count > stock) {
      setCount(stock);
    } else {
      setCount(1);
    }
  };

  return (
    <div className="itemCount">
      {stock > 0 && (
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="outline-secondary" onClick={handleClickResta}>
              -
            </Button>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            value={count}
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
      {!(count > 0) && (
        <InfoMessage
          msg={`Introduzca una cantidad válida`}
          type="warning"
          animation="animate__slideInUp"
        />
      )}
      {count > stock && (
        <InfoMessage
          msg={`Stock insuficiente. Disponible ${stock}u`}
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
      <Button
        variant="danger"
        onClick={count > 0 && count <= stock ? () => onAdd(count) : null}
        block
        disabled={!(count > 0 && count <= stock)}
      >
        Añadir Al Carrito
      </Button>
    </div>
  );
};

export default ItemCount;
