import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import InfoMessage from "../InfoMessage";
import "./ItemCount.scss";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleChange = e => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) {
      setCount(parseInt(valor) || valor);
    }
  };

  const handleClickSuma = () => {
    if (count > 0 && count < stock) {
      setCount(count => count + 1);
    } else if (count >= stock) {
      setCount(stock);
    } else {
      setCount(1);
    }
  };

  const handleClickResta = () => {
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
