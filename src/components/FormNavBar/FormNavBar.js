import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import iconSearch from "../../assets/img/icon_search_w.png";
import "./FormNavBar.scss";

const FormNavBar = () => {
  return (
    <>
      <Form className="d-flex formNavBar">
        <FormControl
          type="search"
          placeholder="Descripción, marca, tipo, ..."
          aria-label="Buscar"
        />
        <Button variant="danger">
          <img src={iconSearch} alt="Buscar" />
        </Button>
      </Form>
    </>
  );
};

export default FormNavBar;
