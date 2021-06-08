import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import iconSearch from "../../assets/img/icon_search_w.png";
import "./SearchForm.scss";

const SearchForm = () => {
  return (
    <>
      <Form className="d-flex searchForm">
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

export default SearchForm;
