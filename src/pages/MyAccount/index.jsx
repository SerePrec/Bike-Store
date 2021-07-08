import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import { getAuth } from "../../firebase";
import InfoBar from "../../components/InfoBar";
import InfoMessage from "../../components/InfoMessage";
import TypicButton from "../../components/TypicButton";
import signInIcon from "../../assets/img/sign-in-alt.svg";
import signOutIcon from "../../assets/img/sign-out-alt.svg";
import "./MyAccount.scss";

const MyAccount = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isError, setIsError] = useState(null);
  const { authUser } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    const sigForm = e.currentTarget;
    if (sigForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setIsSigning(true);
    setIsError(null);
    getAuth()
      .signInWithEmailAndPassword(form.email.trim(), form.password.trim())
      .then(userCredential => {
        console.log("Inicio de sesión exitoso");
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setIsError({ errorCode, errorMessage });
        console.log(errorCode, errorMessage);
      })
      .finally(() => {
        setIsSigning(false);
      });
  };

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({ ...form, [name]: value });
  };

  const handleLogout = () => {
    getAuth()
      .signOut()
      .then(() => {
        console.log("Abandono la sesión correctamente");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <main className={`myAccount ${authUser ? "auth" : ""}`}>
      <InfoBar
        title={`MI CUENTA - ${
          authUser ? authUser.displayName.toUpperCase() : "INICIA SESIÓN"
        }`}
      >
        {authUser && (
          <TypicButton
            //size="sm"
            className="animate__fadeIn"
            onClick={handleLogout}
          >
            CERRAR SESION
            <img src={signOutIcon} alt="Salir" />
          </TypicButton>
        )}
      </InfoBar>
      {authUser ? (
        <div className="container-xl userDataContainer">
          <div className="userData animate__zoomIn"></div>
        </div>
      ) : (
        <div className="logInForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
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
              />
              <Form.Control.Feedback type="invalid">
                No cumple requisitos, revísala.
              </Form.Control.Feedback>
              <Form.Text>Debe tener al menos 6 caracteres.</Form.Text>
            </Form.Group>
            <Button
              variant="danger w-50 mt-4"
              type="submit"
              disabled={isSigning}
            >
              {isSigning ? "Iniciando..." : "Inicia Sesión"}
              <img src={signInIcon} alt="Ingresar" />
            </Button>
          </Form>
          {isError && (
            <InfoMessage
              msg={`Error: ${isError.errorCode}. Mensaje: ${isError.errorMessage}.`}
              type="danger"
              className="mt-3"
              animation="animate__slideInUp"
            />
          )}

          <div className="mt-4 text-center">
            ¿No tienes cuenta? <Link to="/register">¡Registrate aquí!</Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyAccount;
