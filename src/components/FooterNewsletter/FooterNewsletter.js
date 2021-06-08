import React from "react";
import SubscriptionForm from "../SubscriptionForm/SubscriptionForm";
import "./FooterNewsletter.scss";

const FormNewsletter = () => {
  return (
    <section className="newsletter">
      <p className="newsletter__title">Suscribite a nuestro newsletter</p>
      <p>Recibe nuestras novedades, promociones y eventos.</p>
      <p>
        Además participás de nuestro <span>SORTEO ANUAL</span> y sorteos
        mensuales.
      </p>
      <SubscriptionForm />
    </section>
  );
};

export default FormNewsletter;
