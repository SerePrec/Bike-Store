import React from "react";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

const FormFooter = () => {
  return (
    <Form>
      <InputGroup>
        <FormControl
          type="email"
          name="email"
          placeholder="Ingresa tu e-mail"
          required
        />
        <InputGroup.Append>
          <FormControl type="submit" value="SUSCRIBITE" />
        </InputGroup.Append>
      </InputGroup>
      <Form.Check
        type="checkbox"
        id="aceptar"
        name="aceptar"
        value="1"
        label={
          <>
            Al enviar tu dirección de correo electrónico, aceptas los
            <a href="#">Términos y Condiciones</a>
          </>
        }
        custom
        required
      />
    </Form>
  );
};

export default FormFooter;
