import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import SearchForm from "../SearchForm";
import CartWidget from "../CartWidget";
import logo from "../../assets/img/logo.svg";
import iconMenu from "../../assets/img/iconred.png";
import logoCuenta from "../../assets/img/cuenta.svg";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark">
        <Navbar.Toggle aria-controls="navbar-categories">
          <img src={iconMenu} alt="Icono menú" />
        </Navbar.Toggle>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            height="80"
            className="d-inline-block align-top animate__flipInX"
            alt="Logo de Mamooth - Inicio"
          />
        </Navbar.Brand>
        <SearchForm placeholder={`Descripción, marca, tipo, ...`} />
        <Navbar.Collapse id="navbar-myAccount">
          <Nav.Link href="#miCuenta">
            <img src={logoCuenta} alt="Mi cuenta" />
            MI CUENTA
          </Nav.Link>
        </Navbar.Collapse>
        <CartWidget />
        <Navbar.Collapse id="navbar-categories">
          <Nav className="m-auto animate__fadeInDown">
            <Nav.Link href="#bicicletas">BICICLETAS</Nav.Link>
            <Nav.Link href="#componentes">COMPONENTES</Nav.Link>
            <Nav.Link href="#accesorios">ACCESORIOS</Nav.Link>
            <Nav.Link href="#equipamiento">EQUIPAMIENTO</Nav.Link>
            <Nav.Link href="#indumentaria">INDUMENTARIA</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
