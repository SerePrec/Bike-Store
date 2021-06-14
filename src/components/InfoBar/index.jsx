import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./InfoBar.scss";

const InfoBar = ({ title, children }) => {
  return (
    <Breadcrumb className="container-xl mt-3 mb-0 p-0">
      <h4>{title}</h4>
      {children}
    </Breadcrumb>
  );
};

export default InfoBar;
