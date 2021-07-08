import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getAuth, authGoogleProvider } from "../../firebase";
import InfoBar from "../../components/InfoBar";
import TypicButton from "../../components/TypicButton";
import "./MyAccount.scss";

const MyAccount = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogged, setIsLogged] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [sigResults, setSigResults] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const sigForm = e.currentTarget;
    if (sigForm.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setIsSigning(true);
    setSigResults(null);
    getAuth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        // Signed in
        let user = userCredential.user;
        console.log(user);
        // ...
        setIsLogged(true);
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
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
        // Sign-out successful.
        setIsLogged(false);
      })
      .catch(error => {
        // An error happened.
      });
  };

  const handleLoginGoogle = () => {
    let provider = authGoogleProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    getAuth().useDeviceLanguage();
    getAuth()
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // ...
        console.log((token, user));
      })
      .catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <main className="myAccount">
      <InfoBar title="MI CUENTA">
        <TypicButton size="sm" onClick={handleLogout}>
          Cerrar Sesión
        </TypicButton>
      </InfoBar>
      <div className="logInForm">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              pattern="\S{6,}"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              Debe tener al menos xx caracters.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </Form>
        <Button variant="danger" onClick={handleLoginGoogle}>
          Entrar con GOOGLE
        </Button>
        <div>
          No tienes cuenta? <Link to="/register">Registrate!</Link>
        </div>
      </div>
    </main>
  );
};

export default MyAccount;
