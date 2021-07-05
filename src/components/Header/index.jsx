import React from "react";
import { useCategories } from "../../hooks/useCategories";
import NavBar from "../NavBar";
import "./Header.scss";

const Header = () => {
  const { categories } = useCategories();

  return (
    <header>
      <NavBar categories={categories} />
    </header>
  );
};

export default Header;
