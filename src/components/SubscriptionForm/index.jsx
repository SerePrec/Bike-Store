import React, { useState } from "react";
import { FormControl, InputGroup, Form } from "react-bootstrap";
import "./SubscriptionForm.scss";
import { useSubscription } from "../../hooks/useSubscription";

const SubscriptionForm = ({
  handleShowTermsModal,
  handleShowUserModal,
  setContentUserModal
}) => {
  const [form, setForm] = useState({ email: "", subscribe: false });
  const { isLoading, subscribe } = useSubscription({
    handleShowUserModal,
    setContentUserModal,
    setForm
  });

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({ ...form, [name]: value });
  };

  return (
    <Form
      className="subscriptionForm"
      onSubmit={e => {
        subscribe(e, form);
      }}
    >
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
          <FormControl
            type="submit"
            value={isLoading ? "ENVIANDO.." : "SUSCRIBITE"}
            disabled={isLoading}
          />
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
