import React from "react";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import twitter from "../../assets/img/twitter.svg";
import youtube from "../../assets/img/youtube.svg";
import "./FooterSocial.scss";

const FormSocial = () => {
  return (
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
  );
};

export default FormSocial;
