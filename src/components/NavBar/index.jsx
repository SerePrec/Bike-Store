import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget";
import SearchForm from "../SearchForm";
import iconMenu from "../../assets/img/iconred.png";
import logo from "../../assets/img/logo.svg";
import logoCuenta from "../../assets/img/cuenta.svg";
import "./NavBar.scss";

const NavBar = ({ categories }) => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark">
        <Navbar.Toggle aria-controls="navbar-categories">
          <img src={iconMenu} alt="Icono menú" />
        </Navbar.Toggle>
        <Navbar.Brand as={Link} to={`/`}>
          <img
            src={logo}
            height="80"
            className="d-inline-block align-top animate__flipInX"
            alt="Logo de Mamooth - Inicio"
          />
        </Navbar.Brand>
        <SearchForm placeholder={`Descripción, marca, tipo, ...`} />
        <Navbar.Collapse id="navbar-myAccount">
          <Nav.Link as={Link} to={`/myaccount`}>
            <img src={logoCuenta} alt="Mi cuenta" />
            MI CUENTA
          </Nav.Link>
        </Navbar.Collapse>
        <CartWidget />
        <Navbar.Collapse
          id="navbar-categories"
          className={categories ? "" : "animate__catLoad"}
        >
          {categories && (
            <Nav className="m-auto animate__navbar-nav--loaded">
              {categories.map(cat => (
                <Nav.Link
                  key={cat.id}
                  as={NavLink}
                  exact
                  to={`/category/${cat.key}`}
                  activeClassName="activeLink"
                  eventKey={cat.id}
                  active={false}
                >
                  {cat.description.toUpperCase()}
                </Nav.Link>
              ))}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
