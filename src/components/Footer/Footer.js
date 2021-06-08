import React from "react";
import "./Footer.scss";
import FooterInfo from "../FooterInfo/FooterInfo";
import FooterNewsletter from "../FooterNewsletter/FooterNewsletter";
import FooterSocial from "../FooterSocial/FooterSocial";

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
