import React from "react";
import "./InfoMessage.scss";

const InfoMessage = ({ msg, className, type, animation }) => {
  return (
    <div
      className={`infoMessage ${type ? type : ""} ${
        animation ? animation : ""
      } ${className || ""}`}
    >
      <p>{msg}</p>
    </div>
  );
};

export default InfoMessage;
