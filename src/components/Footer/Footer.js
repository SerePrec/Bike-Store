import React from "react";
import "./Footer.scss";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import twitter from "../../assets/img/twitter.svg";
import youtube from "../../assets/img/youtube.svg";
import FormFooter from "../FormFooter/FormFooter";

const Footer = () => {
  return (
    <footer>
      <div className="contenidoFooter">
        <section className="info">
          <p>Vive la bici con Mammoth.</p>
          <p>Mucho más que tu tienda de bicis.</p>
          <p>Lunes a viernes de 9hs a 19hs.</p>
          <p>Sábados de 9hs a 14hs.</p>
        </section>
        <section className="newsletter">
          <p className="newsletter__titulo">Suscribite a nuestro newsletter</p>
          <p>Recibe nuestras novedades, promociones y eventos.</p>
          <p>
            Además participás de nuestro <span>SORTEO ANUAL</span> y sorteos
            mensuales.
          </p>
          <FormFooter />
        </section>
        <section className="social">
          <div className="social__titulo">SOCIAL</div>
          <a href="">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="">
            <img src={youtube} alt="YouTube" />
          </a>
        </section>
      </div>
      <address>
        <p className="font-italic">Copyright &copy; 2020 SerE PreC </p>
      </address>
    </footer>
  );
};

export default Footer;
