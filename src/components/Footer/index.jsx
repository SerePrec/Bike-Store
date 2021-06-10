import React from "react";
import FooterInfo from "../FooterInfo";
import FooterNewsletter from "../FooterNewsletter";
import FooterSocial from "../FooterSocial";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footerContent">
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
