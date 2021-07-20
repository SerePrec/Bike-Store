import React, { useState } from "react";
import { FormControl, InputGroup, Form } from "react-bootstrap";
import { infoModalMessages } from "../../utils/modalMessages";
import "./SubscriptionForm.scss";

const SubscriptionForm = ({
  handleShowTermsModal,
  handleShowUserModal,
  setContentUserModal
}) => {
  const [form, setForm] = useState({ email: "", subscribe: false });

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({ ...form, [name]: value });
  };

  const fakeSubmit = e => {
    e.preventDefault();
    setContentUserModal({ ...infoModalMessages[2], msg2: form.email });
    handleShowUserModal();
    setForm({ email: "", subscribe: false });
  };

  return (
    <Form className="subscriptionForm" onSubmit={fakeSubmit}>
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
        checked={form.subscribe}
        onChange={handleChange}
        label={
          <>
            Al enviar tu dirección de correo electrónico, aceptas los
            <a href="#terms" onClick={handleShowTermsModal}>
              Términos y Condiciones
            </a>
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
