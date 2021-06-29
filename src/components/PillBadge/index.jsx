import React from "react";
import "./PillBadge.scss";

const PillBadge = ({ children, variant }) => {
  return <p className={`pillBadge ${variant ? variant : ""}`}>{children}</p>;
};

export default PillBadge;
