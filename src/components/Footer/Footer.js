import React from "react";
import "./Footer.scss";
import FooterInfo from "./FooterInfo";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocial from "./FooterSocial";

const Footer = () => {
  return (
    <footer>
      <div className="contenidoFooter">
        <FooterInfo />
        <FooterNewsletter />
        <FooterSocial />
      </div>
      <address>
        <p className="font-italic">Copyright &copy; 2020 SerE PreC </p>
      </address>
    </footer>
  );
};

export default Footer;
