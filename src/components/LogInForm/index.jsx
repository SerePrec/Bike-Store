import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSetForm } from "../../hooks/useSetForm";
import signInIcon from "../../assets/img/sign-in-alt.svg";
import "./LogInForm.scss";

const LogInForm = ({ validated, isSigning, handleSubmit }) => {
  const { form, handleChange } = useSetForm({
    email: "",
    password: ""
  });

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={e => {
        handleSubmit(e, form);
      }}
      className="logInForm"
    >
      <Form.Group controlId="inputEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          placeholder="Ingresa tu email"
          onChange={handleChange}
          required
        />{" "}
        <Form.Control.Feedback type="invalid">
          Introduce una dirección de email válida.
        </Form.Control.Feedback>
        <Form.Text>Será tu usuario para ingresar.</Form.Text>
      </Form.Group>

      <Form.Group controlId="inputPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          placeholder="Ingresa tu constraseña"
          pattern="\S{6,}"
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          No cumple requisitos, revísala.
        </Form.Control.Feedback>
        <Form.Text>Debe tener al menos 6 caracteres.</Form.Text>
      </Form.Group>
      <Button variant="danger w-50 mt-4" type="submit" disabled={isSigning}>
        {isSigning ? "Iniciando..." : "Inicia Sesión"}
        <img src={signInIcon} alt="Ingresar" />
      </Button>
    </Form>
  );
};

export default LogInForm;
