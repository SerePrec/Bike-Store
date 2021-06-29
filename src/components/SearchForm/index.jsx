import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, FormControl, Button } from "react-bootstrap";
import iconSearch from "../../assets/img/icon_search_w.png";
import "./SearchForm.scss";

const SearchForm = ({ placeholder = "Buscar..." }) => {
  const [search, setSearch] = useState("");
  let history = useHistory();

  const handleChange = e => {
    const input = e.target.value;
    setSearch(input);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const input = search.trim();
    if (input) {
      history.push(`/search?q=${input}`);
      setSearch("");
    }
  };

  return (
    <>
      <Form
        className="d-flex searchForm"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <FormControl
          type="search"
          placeholder={placeholder}
          aria-label="Buscar productos"
          value={search}
          onChange={e => {
            handleChange(e);
          }}
        />
        <Button variant="danger" type="submit">
          <img src={iconSearch} alt="Buscar" />
        </Button>
      </Form>
    </>
  );
};

export default SearchForm;
