import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import logo from "../../assets/img/logo.svg";
import iconMenu from "../../assets/img/iconred.png";
import logoCuenta from "../../assets/img/cuenta.svg";
import "./NavBar.scss";
import FormNavBar from "../FormNavBar/FormNavBar";

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark">
        <Navbar.Toggle aria-controls="navbar-categorias">
          <img src={iconMenu} alt="Icono menú" />
        </Navbar.Toggle>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            height="80"
            className="d-inline-block align-top"
            alt="Logo de Mamooth - Inicio"
          />
        </Navbar.Brand>
        <FormNavBar />
        <Navbar.Collapse id="navbar-miCuenta">
          <Nav.Link href="#miCuenta">
            <img src={logoCuenta} alt="Mi cuenta" />
            MI CUENTA
          </Nav.Link>
        </Navbar.Collapse>
        <Nav.Link className="carritoIcon" href="#carrito">
          MI CARRITO
        </Nav.Link>
        <Navbar.Collapse id="navbar-categorias">
          <Nav className="m-auto">
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
