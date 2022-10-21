import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

function Login() {
	return (
		<>
		<Form>
		<Form.Group>
			<Form.Label htmlFor='email'>Email</Form.Label>
			<Form.Control
			type='text'
			placeholder='your email'
			name='email'
			required
			/>

		 <Form.Control.Feedback type='invalid'>Please enter an email address!</Form.Control.Feedback>
		</Form.Group>

		<Form.Group>
			<Form.Control
			type='text'
			placeholder='your password'
			name='password'
			required
			/>
			<Form.Control.Feedback type='invalid'>Please enter a password!</Form.Control.Feedback>
		</Form.Group>

		<Button
        //   disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
		</Form>

		</>

	);
}

export default Login;
