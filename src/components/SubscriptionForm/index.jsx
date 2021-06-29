import React, { useState } from "react";
import { FormControl, InputGroup, Form } from "react-bootstrap";
import "./SubscriptionForm.scss";

const SubscriptionForm = () => {
  const [form, setForm] = useState({ email: "", subscribe: false });

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("datos enviados");
  };

  return (
    <Form className="subscriptionForm" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          type="email"
          name="email"
          value={form.email}
          placeholder="Ingresa tu e-mail"
          onChange={handleChange}
          required
        />
        <InputGroup.Append>
          <FormControl type="submit" value="SUSCRIBITE" />
        </InputGroup.Append>
      </InputGroup>
      <Form.Check
        type="checkbox"
        name="subscribe"
        value={form.subscribe}
        onChange={handleChange}
        label={
          <>
            Al enviar tu dirección de correo electrónico, aceptas los
            <a href="#terms">Términos y Condiciones</a>
          </>
        }
        id="aceptSubscription"
        custom
        required
      />
    </Form>
  );
};

export default SubscriptionForm;
