import React from "react";
import "./Loader.scss";

const Loader = ({ message, type }) => {
  const { title, msg1, msg2 } = message || {};
  return (
    <div className={`loader ${type || ""}`}>
      {title && <h3>{title}</h3>}
      {msg1 && <p>{msg1}</p>}
      {msg2 && <p>{msg2}</p>}
    </div>
  );
};

export default Loader;
