import React from "react";
import { useHistory } from "react-router-dom";
import error404Img from "../../assets/img/error404.png";
import TypicButton from "../../components/TypicButton";
import "./Error404.scss";

const Error404 = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <main className="error404Page">
      <img src={error404Img} alt="Bicicleta en latido cardíaco" />
      <h1>404</h1>
      <p>ERROR</p>
      <p>Lo sentimos, página no encontrada</p>
      <TypicButton className="mt-3 soft" onClick={handleClick}>
        Ir a Home
      </TypicButton>
    </main>
  );
};

export default Error404;
