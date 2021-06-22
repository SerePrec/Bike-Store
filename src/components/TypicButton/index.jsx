import React from "react";
import { Button } from "react-bootstrap";
import "./TypicButton.scss";

const TypicButton = ({ children, className, onClick }) => {
  return (
    <Button
      variant="danger"
      className={`typicBtn ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TypicButton;
