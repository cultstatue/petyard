import React, { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

function Signup() {
	return (

		<Form.Group>
			<Form.Label htmlFor='email'>Email</Form.Label>
			<Form.Control
			type='text'
			placeholder='your email'
			name='email'
			/>
		</Form.Group>

	);
}

export default Signup;
