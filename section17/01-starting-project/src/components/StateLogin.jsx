// Components
import Input from "./Input";

// Validation
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

// Hooks
import { useInput } from "../hooks/useInput";

export default function Login() {
	const {
		value: emailValue,
		handleInputChange: handleEmailChange,
		handleInputBlur: handleEmailBlur,
		hasError: emailHasError,
	} = useInput("", (value) => {
		return isEmail(value) && isNotEmpty(value);
	});

	const {
		value: passwordValue,
		handleInputChange: handlePasswordChange,
		handleInputBlur: handlePasswordBlur,
		hasError: passwordHasError,
	} = useInput("", (value) => {
		return hasMinLength(value, 6);
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (emailHasError || passwordHasError) return;

		console.log("email: ", emailValue);
		console.log("passowd: ", passwordValue);
		// Reset the form
		setEnteredValues({
			email: "",
			password: "",
		});
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
					onBlur={handleEmailBlur}
					onChange={handleEmailChange}
					value={emailValue}
					error={emailHasError && "Email is invalid"}
				/>

				<Input
					label="Password"
					id="password"
					type="password"
					name="password"
					onBlur={handlePasswordBlur}
					onChange={handlePasswordChange}
					value={passwordValue}
					error={passwordHasError && "Password is invalid"}
				/>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
