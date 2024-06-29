import { useState } from "react";

export default function Login() {
	const [enteredValues, setEnteredValues] = useState({
		email: "",
		password: "",
	});

	const emailIsInvalid = enteredValues.email && !enteredValues.email.includes("@");

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

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className="control-row">
				<div className="control no-margin">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" name="email" onChange={(e) => handleInputChange("email", e)} value={enteredValues.email} />
					{emailIsInvalid && <div className="control-error">Email is invalid</div>}
				</div>

				<div className="control no-margin">
					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" onChange={(e) => handleInputChange("password", e)} value={enteredValues.password} />
				</div>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
