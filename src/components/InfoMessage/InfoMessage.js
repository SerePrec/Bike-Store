import React from "react";
import "./InfoMessage.scss";

const Message = ({ msg, type, animation }) => {
  return (
    <div className={`infoMessage ${type} ${animation}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
