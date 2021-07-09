import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getAuth } from "../../firebase";
import InfoBar from "../../components/InfoBar";
import InfoMessage from "../../components/InfoMessage";
import LogInForm from "../../components/LogInForm";
import TypicButton from "../../components/TypicButton";
import signOutIcon from "../../assets/img/sign-out-alt.svg";
import "./MyAccount.scss";

const MyAccount = () => {
  const [validated, setValidated] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isError, setIsError] = useState(null);
  const { authUser } = useContext(UserContext);

  const handleSubmit = (e, form) => {
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
        setValidated(false);
      });
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

  const formProps = {
    validated,
    isSigning,
    handleSubmit
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
        <div className="logInFormContainer">
          <LogInForm {...formProps}></LogInForm>
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
