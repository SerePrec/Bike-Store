import React from "react";
import { Form } from "react-bootstrap";

const selectOptions = [
  { value: "p", description: "Destacados ▲" },
  { value: "a", description: "Marca A-Z" },
  { value: "z", description: "Marca Z-A" },
  { value: "-", description: "Menor precio" },
  { value: "+", description: "Mayor precio" },
  { value: "d-", description: "Menor descuento" },
  { value: "d+", description: "Mayor descuento" }
];

const SortSelector = ({ value, handleChange }) => {
  return (
    <Form.Control as="select" name="sort" value={value} onChange={handleChange}>
      {selectOptions.map(elem => (
        <option key={elem.value} value={elem.value}>
          {elem.description}
        </option>
      ))}
    </Form.Control>
  );
};

export default SortSelector;
