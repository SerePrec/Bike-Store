import React from "react";
import facebook from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import twitter from "../../assets/img/twitter.svg";
import youtube from "../../assets/img/youtube.svg";
import "./FooterSocial.scss";

const FormSocial = () => {
  return (
    <section className="social">
      <div className="social__title">SOCIAL</div>
      <a
        href="https://www.facebook.com/MundoMammoth"
        target="_blank"
        rel="noreferrer"
      >
        <img src={facebook} alt="Facebook" />
      </a>
      <a
        href="https://www.instagram.com/mundo_mammoth/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={instagram} alt="Instagram" />
      </a>
      <a
        href="https://twitter.com/MundoMammoth"
        target="_blank"
        rel="noreferrer"
      >
        <img src={twitter} alt="Twitter" />
      </a>
      <a
        href="https://www.youtube.com/user/mundomammoth"
        target="_blank"
        rel="noreferrer"
      >
        <img src={youtube} alt="YouTube" />
      </a>
    </section>
  );
};

export default FormSocial;
