import { useState } from "react";

// Components
import Input from "./Input";

// Validation
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
	const [enteredValues, setEnteredValues] = useState({
		email: "",
		password: "",
	});

	const [didEdit, setDidEdit] = useState({
		email: false,
		password: false,
	});

	const emailIsInvalid =
		didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
	const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

	function handleSubmit(e) {
		e.preventDefault();

		// Reset the form
		setEnteredValues({
			email: "",
			password: "",
		});
	}

	function handleInputChange(identifier, e) {
		setEnteredValues((prevValues) => {
			return {
				...prevValues,
				[identifier]: e.target.value,
			};
		});
	}

	function handleInputBlur(identifier, e) {
		setDidEdit((prevEdit) => {
			return {
				...prevEdit,
				[identifier]: true,
			};
		});
		console.log("blur: ", identifier);
		// setEnteredValues((prevValues) => {
		// 	return {
		// 		...prevValues,
		// 		[identifier]: e.target.value,
		// 	};
		// });
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className="control-row">
				<Input
					label="Email"
					id="email"
					type="email"
					name="email"
					onBlur={(e) => handleInputBlur("email", e)}
					onChange={(e) => handleInputChange("email", e)}
					value={enteredValues.email}
					error={emailIsInvalid && "Email is invalid"}
				/>

				<Input
					label="Password"
					id="password"
					type="password"
					name="password"
					onBlur={(e) => handleInputBlur("password", e)}
					onChange={(e) => handleInputChange("password", e)}
					value={enteredValues.password}
					error={passwordIsInvalid && "Password is invalid"}
				/>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
