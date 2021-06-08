import React from "react";
import FormFooter from "../FormFooter/FormFooter";
import "./FooterNewsletter.scss";

const FormNewsletter = () => {
  return (
    <section className="newsletter">
      <p className="newsletter__titulo">Suscribite a nuestro newsletter</p>
      <p>Recibe nuestras novedades, promociones y eventos.</p>
      <p>
        Además participás de nuestro <span>SORTEO ANUAL</span> y sorteos
        mensuales.
      </p>
      <FormFooter />
    </section>
  );
};

export default FormNewsletter;
