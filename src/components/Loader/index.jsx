import React from "react";
import "./Loader.scss";

const Loader = ({ message }) => {
  const { title, msg1, msg2 } = message || {};
  return (
    <div className="loader">
      <h3>{title}</h3>
      <p>{msg1}</p>
      <p>{msg2}</p>
    </div>
  );
};

export default Loader;
