import React from "react";
import NavBar from "../NavBar";
import "./Header.scss";

const Header = ({ categories }) => {
  return (
    <header>
      <NavBar categories={categories} />
    </header>
  );
};

export default Header;
