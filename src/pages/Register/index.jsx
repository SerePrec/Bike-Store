import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth } from "../../firebase";
import InfoBar from "../../components/InfoBar";
import InfoMessage from "../../components/InfoMessage";
import TypicButton from "../../components/TypicButton";
import "./Register.scss";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });
  const [validated, setValidated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regResults, setRegResults] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const regForm = e.currentTarget;
    if (regForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setIsRegistering(true);
    setRegResults(null);
    getAuth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        let user = userCredential.user;
        console.log("Usuario Registrado con éxito");
        return user.updateProfile({
          displayName: form.name
        });
      })
      .then(() => {
        console.log("Perfil añadido con éxito");
        return getAuth().signOut();
      })
      .then(() => {
        setRegResults("ok");
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setRegResults({ errorCode, errorMessage });
        console.log(errorCode, errorMessage);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({ ...form, [name]: value });
  };

  return (
    <main className="register">
      <InfoBar title="REGÍSTRATE"></InfoBar>
      <div className="registerForm">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className={regResults === "ok" ? "regOk" : ""}
        >
          <Form.Group controlId="formBasicText">
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
            <Form.Text>
              Es con el que te indentificarás en nuestro sitio.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
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

          <Form.Group controlId="formBasicPassword">
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
          <Form.Group controlId="formBasicCheckbox">
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
              required
              disabled={regResults === "ok"}
            />
          </Form.Group>
          {regResults !== "ok" && (
            <Button
              variant="danger w-50"
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? "Registrando..." : "Registrar"}
            </Button>
          )}
        </Form>
        {regResults && (
          <InfoMessage
            msg={
              regResults === "ok"
                ? `Usuario registrado con éxito. Continúa iniciando sesión`
                : `Error: ${regResults.errorCode}. Mensaje: ${regResults.errorCode}.`
            }
            type={regResults === "ok" ? "info" : "danger"}
            className="mt-3"
            animation="animate__slideInUp"
          />
        )}
        {regResults === "ok" && (
          <TypicButton as={Link} to="/myaccount">
            Iniciar Sesión
          </TypicButton>
        )}
      </div>
    </main>
  );
};

export default Register;
