import { useState } from "react";

import { styled } from "styled-components";

// Components
import Button from "./Button.jsx";
import CustomInput from "./Input.jsx";

const ControlDiv = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleInputChange(identifier, value) {
		if (identifier === "email") {
			setEnteredEmail(value);
		} else {
			setEnteredPassword(value);
		}
	}

	function handleLogin() {
		setSubmitted(true);
	}

	const emailNotValid = submitted && !enteredEmail.includes("@");
	const passwordNotValid = submitted && enteredPassword.trim().length < 6;

	return (
		<div id="auth-inputs">
			<ControlDiv>
				<p>
					<CustomInput
						invalid={emailNotValid}
						label="Email"
						type="email"
						style={{
							backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db",
						}}
						onChange={(event) => handleInputChange("email", event.target.value)}
					/>
				</p>
				<p>
					<CustomInput label="Password" $invalid={passwordNotValid} type="password" className={passwordNotValid ? "invalid" : undefined} onChange={(event) => handleInputChange("password", event.target.value)} />
				</p>
			</ControlDiv>
			<div className="actions">
				<Button type="button">Create a new account</Button>
				<Button onClick={handleLogin}>Sign In</Button>
			</div>
		</div>
	);
}
