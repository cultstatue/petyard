import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import { getDefaultValues } from "@apollo/client/utilities";
function Signup() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(`name is ${name} value is ${value}`);
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const formHandler = async (event) => {
    console.log(userFormData);
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log("user form data " + userFormData.email);

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={formHandler}>
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        Something went wrong!
      </Alert>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Text className="text">Enter an email address</Form.Text>
        <Form.Control
          name="email"
          type="text"
          placeholder="Email"
          onChange={handleInputChange}
          defaultValue={userFormData.email}
          required
        />

        <Form.Control.Feedback type="invalid">
          Please enter an email address!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Text className="text">Create a username</Form.Text>
        <Form.Control
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleInputChange}
          defaultValue={userFormData.username}
          required
        />

        <Form.Control.Feedback type="invalid">
          Please enter a username!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Text className="text">Create a password</Form.Text>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          defaultValue={userFormData.password}
          required
        />

        <Form.Control.Feedback type="invalid">
          Please enter a username!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="placeholder"></Form.Group>
      <Button
        disabled={
          !(
            userFormData.username &&
            userFormData.email &&
            userFormData.password
          )
        }
        type="submit"
        variant="success"
      >
        Submit
      </Button>
    </Form>
  );
}

export default Signup;
