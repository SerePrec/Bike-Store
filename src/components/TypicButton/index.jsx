import React from "react";
import { Button } from "react-bootstrap";
import "./TypicButton.scss";

const TypicButton = props => {
  const { children, className, ...rest } = props;
  return (
    <Button
      variant="danger"
      className={`typicBtn ${className || ""}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TypicButton;
