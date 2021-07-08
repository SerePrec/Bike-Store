import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getAuth } from "../../firebase";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", terms: false });
  const handleSubmit = e => {
    e.preventDefault();
    getAuth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        // Signed in
        let user = userCredential.user;
        console.log(userCredential, user);

        // ...
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

  return (
    <Form onSubmit={handleSubmit} className="w-25 m-auto">
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
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          name="terms"
          checked={form.terms}
          label="Acepto terminos y condiciones"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registar
      </Button>
    </Form>
  );
};

export default Register;
