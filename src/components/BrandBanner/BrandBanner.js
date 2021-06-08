import React from "react";
import logoSecialized from "../../assets/img/logo_Specialized.png";
import logoOrbea from "../../assets/img/logo_orbea.png";
import logoScott from "../../assets/img/logo_Scott.png";
import logoGiant from "../../assets/img/logo_Giant.png";
import logoCube from "../../assets/img/logo_Cube.png";
import logoCannodale from "../../assets/img/logo_Cannondale.png";
import logoMerida from "../../assets/img/logo_Merida.png";
import "./BrandBanner.scss";

const BrandBanner = () => {
  return (
    <div className="brands">
      <a
        href="https://www.specialized.com/ar/es"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoSecialized} alt="Specialized" />
      </a>
      <a href="https://www.orbea.com/ar-es/" target="_blank" rel="noreferrer">
        <img src={logoOrbea} alt="Orbea" />
      </a>
      <a
        href="https://www.scott-sports.com/ar/es"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoScott} alt="Scott" />
      </a>
      <a
        href="https://www.giant-bicycles.com/es"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoGiant} alt="Giant" />
      </a>
      <a
        href="https://www.cube.eu/es/cube-bikes/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoCube} alt="Cube" />
      </a>
      <a
        href="https://www.cannondale.com/es-es"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoCannodale} alt="Cannondale" />
      </a>
      <a
        href="https://www.merida-bikes.com/es-es"
        target="_blank"
        rel="noreferrer"
      >
        <img src={logoMerida} alt="Merida" />
      </a>
    </div>
  );
};

export default BrandBanner;
