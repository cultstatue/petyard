import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'

import Auth from "../../utils/auth";

function Login() {

	const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      console.log(data);

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
	return (
		<>
		<Form noValidate validated={validated} onSubmit={handleFormSubmit}>

		<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>

		<Form.Group className="mb-3" controlId="formEmail">
        <Form.Text className="text">Enter your email address</Form.Text>
			<Form.Control
			name="email"
			type='text'
			placeholder='your email'
			onChange={handleInputChange}
            value={userFormData.email}
			required
			/>

		 <Form.Control.Feedback type='invalid'>Please enter an email address!</Form.Control.Feedback>
		</Form.Group>

		<Form.Group className="mb-3" controlId="formPassword">
		<Form.Text className="text">Enter your password</Form.Text>
			<Form.Control
			name="password"
			type='text'
			placeholder='your password'
			onChange={handleInputChange}
            value={userFormData.password}
			required
			/>
			<Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
		</Form.Group>

		<Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
		</Form>

		</>

	);
}

export default Login;
