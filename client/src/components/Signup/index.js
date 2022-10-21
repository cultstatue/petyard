import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';
function Signup() {

	const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

	const [validated] = useState(false);

	const [showAlert, setShowAlert] = useState(false);

	const [addUser, { error }] = useMutation(ADD_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};
	
	const formHandler = async(event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		
	    try {
			const { data } = await addUser({
			  variables: { ...userFormData,}
			})
	  
			console.log(data);
	  
			Auth.login(data.addUser.token);
	  
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

		<Form noValidate validated={validated} onSubmit={formHandler}>

		<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
				Something went wrong!å
        </Alert>

			<Form.Group classname="mb-3" controlId="formEmail">
				<Form.Text className="text">
					Enter an email address
				</Form.Text>
				<Form.Control 
				type="email" 
				placeholder="Email"
				onChange={handleInputChange}
				value={userFormData.email}
				required
				/>

				<Form.Control.Feedback type='invalid'>Please enter an email address!</Form.Control.Feedback>
			</Form.Group>

			<Form.Group classname="mb-3" controlId="formUsername">
				<Form.Text className="text">
					Create a username
				</Form.Text>
				<Form.Control 
				type="username" 
				placeholder="Username"
				onChange={handleInputChange}
            	value={userFormData.username}
				required
				/>

				<Form.Control.Feedback type='invalid'>Please enter a username!</Form.Control.Feedback>
			</Form.Group>

			<Form.Group classname="mb-3" controlId="formPassword">
				<Form.Text className="text">
					Create a password
				</Form.Text>
				<Form.Control 
				type="password" 
				placeholder="Password" 
				onChange={handleInputChange}
				value={userFormData.password}
				required
				/>

				<Form.Control.Feedback type='invalid'>Please enter a username!</Form.Control.Feedback>
			</Form.Group>
			
			<Form.Group className="mb-3" controlId="placeholder">
				
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>

	);
}

export default Signup;
