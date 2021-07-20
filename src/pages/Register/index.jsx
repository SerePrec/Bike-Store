import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "../../firebase";
import InfoBar from "../../components/InfoBar";
import InfoMessage from "../../components/InfoMessage";
import RegisterForm from "../../components/RegisterForm";
import TermsModal from "../../components/TermsModal";
import TypicButton from "../../components/TypicButton";
import { useModal } from "../../hooks/useModal";
import "./Register.scss";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regResults, setRegResults] = useState(null);
  const { showModal, handleShowModal, handleCloseModal } = useModal(null);

  const handleSubmit = (e, form) => {
    e.preventDefault();
    const regForm = e.currentTarget;
    if (regForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setIsRegistering(true);
    setRegResults(null);
    getAuth()
      .createUserWithEmailAndPassword(form.email.trim(), form.password.trim())
      .then(userCredential => {
        let user = userCredential.user;
        console.log("Usuario Registrado con éxito");
        return user.updateProfile({
          displayName: form.name
        });
      })
      .then(res => {
        console.log("Perfil añadido con éxito");
        return getAuth().signOut();
      })
      .then(res => {
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

  const formProps = {
    validated,
    isRegistering,
    handleSubmit,
    regResults,
    handleShowModal
  };

  return (
    <main className="register">
      <InfoBar title="REGÍSTRATE"></InfoBar>
      <div className="registerFormContainer">
        <RegisterForm {...formProps}></RegisterForm>
        {regResults && (
          <InfoMessage
            msg={
              regResults === "ok"
                ? `Usuario registrado con éxito. Continúa iniciando sesión`
                : `Error: ${regResults.errorCode}. Mensaje: ${regResults.errorMessage}.`
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
      <TermsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      ></TermsModal>
    </main>
  );
};

export default Register;
