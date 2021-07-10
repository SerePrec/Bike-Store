import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useSetForm } from "../../hooks/useSetForm";
import "./RegisterForm.scss";

const RegisterForm = ({
  validated,
  isRegistering,
  handleSubmit,
  regResults
}) => {
  const { form, handleChange } = useSetForm({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={e => {
        handleSubmit(e, form);
      }}
      className={`registerForm ${regResults === "ok" ? "regOk" : ""}`}
    >
      <Form.Group controlId="inputName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          placeholder="Ingresa tu nombre"
          onChange={handleChange}
          required
          disabled={regResults === "ok"}
        />
        <Form.Control.Feedback type="invalid">
          Completa este campo.
        </Form.Control.Feedback>
        <Form.Text>Es con el que te indentificarás en nuestro sitio.</Form.Text>
      </Form.Group>

      <Form.Group controlId="inputEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          placeholder="Ingresa tu email"
          onChange={handleChange}
          required
          disabled={regResults === "ok"}
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
          disabled={regResults === "ok"}
        />
        <Form.Control.Feedback type="invalid">
          No cumple requisitos, revísala.
        </Form.Control.Feedback>
        <Form.Text>Debe tener al menos 6 caracteres.</Form.Text>
      </Form.Group>
      <Form.Group controlId="inputCheckbox">
        <Form.Check
          type="checkbox"
          name="terms"
          checked={form.terms}
          label={
            <>
              Acepto los <a href="#terms">Términos y Condiciones</a>
            </>
          }
          onChange={handleChange}
          isInvalid={validated && !form.terms}
          feedback="Debes estar de acuerdo para continuar."
          required
          disabled={regResults === "ok"}
        />
      </Form.Group>
      {regResults !== "ok" && (
        <Button
          variant="danger w-50 mt-4"
          type="submit"
          disabled={isRegistering}
        >
          {isRegistering ? "Registrando..." : "Registrate"}
          {isRegistering && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="ml-2"
            />
          )}
        </Button>
      )}
    </Form>
  );
};

export default RegisterForm;
