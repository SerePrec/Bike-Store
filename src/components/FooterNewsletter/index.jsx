import React from "react";
import SubscriptionForm from "../SubscriptionForm";
import "./FooterNewsletter.scss";

const FormNewsletter = props => {
  return (
    <section className="newsletter">
      <p className="newsletter__title">Suscribite a nuestro newsletter</p>
      <p>Recibe nuestras novedades, promociones y eventos.</p>
      <p>
        Además participás de nuestro <span>SORTEO ANUAL</span> y sorteos
        mensuales.
      </p>
      <SubscriptionForm {...props} />
    </section>
  );
};

export default FormNewsletter;
