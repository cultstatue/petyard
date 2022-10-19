import React, { useState } from "react";
// Importing email validation 
import { validateEmail } from "../../utils/helpers";

// Contact form starts
function Contact() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const { name, email, message } = formState;
	function handleChange(e) {
		if (e.target.name === "email") {
			const isValid = validateEmail(e.target.value);
			if (!isValid) {
				setErrorMessage("Your email is invalid.");
			} else {
				if (!e.target.value.length) {
					setErrorMessage(`${e.target.name} is required.`);
				} else {
					setErrorMessage("");
				}
			}
		}

		if (!errorMessage) {
			setFormState({ ...formState, [e.target.name]: e.target.value });
		}
	}
	function handleBlank(e) {
		if (e.target.name === "Name" || e.target.name === "Message") {
			if (!e.target.value.length) {
				setErrorMessage(`${e.target.name} is required.`);
			} else {
				setErrorMessage("");
			}
		}

	// If statement for error message--name
		if (!errorMessage) {
			setFormState({ ...formState, [e.target.name]: e.target.value });
		}
	}

	return (
		<section>
			<div className="center">
				<h2 className="page-header">Contact the PetYard Team</h2>
			</div>

			{/* Contact form fields start here */}
			<div>
				<form id="contact-form">
					{/* Name and pet's name field */}
					<div>
						<label htmlFor="Name">Your Name</label>
						<br></br>
						<input
							type="text"
							defaultValue={name}
							onBlur={handleBlank}
							name="Name"
						/>
					</div>
					<div>
						<label htmlFor="Name">Your Pet's Name</label>
						<br></br>
						<input
							type="text"
							defaultValue={name}
							onBlur={handleBlank}
							name="Name"
						/>
					</div>
					{/* Email field */}
					<div>
						<label htmlFor="email">Email</label>
						<br></br>
						<input
							type="email"
							defaultValue={email}
							name="email"
							onBlur={handleChange}
						/>
					</div>
					{/* Message field  */}
					<div>
						<label htmlFor="Message">Message</label>
						<br></br>
						<textarea
							name="Message"
							defaultValue={message}
							onBlur={handleBlank}
							rows="5"
						/>
					</div>
					{errorMessage && (
						<div>
							<p className="error-text">{errorMessage}</p>
						</div>
					)}
					<button type="submit">Send</button>
				</form>
			</div>
		</section>
		// Contact form ends 
	);
}
export default Contact;