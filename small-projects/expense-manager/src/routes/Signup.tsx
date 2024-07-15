// React
import { useContext, useEffect } from "react";
import type { FC, FormEvent } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Svg
import emailIcon from "@/assets/email.svg";
import eyeIcon from "@/assets/eye.svg";

// Hooks
import useToggleInputType from "@/hooks/useToggleInputType";
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission"

// Util
import { isEmail, hasMinLength, checkValuesEqual } from "@/utils/utils";

// Store
import { AuthContext } from "@/store/AuthContext";

// DTO
import SignupDTO from "@/DTO/request/Signup";

const Signup: FC = () => {
	// Store
	const authCTX = useContext(AuthContext);

	// Navigation
	const navigate = useNavigate();

	// Email field
	const emailField = useInput("", (value: string) => {
		return isEmail(value);
	});

	// Password fields
	const password1Field =  useInput("", (value: string) => {
		return hasMinLength(value, 8);
	});
	const password2Field = useInput("", (value: string) => {
		return hasMinLength(value, 8);
	});

		
	// Input type togglers
	const { type: password1InputType, toggleInputType: togglePassword1Type } = useToggleInputType();
	const { type: password2InputType, toggleInputType: togglePassword2Type } = useToggleInputType();


	// Check if the passowrds are equal
	const arePasswordsEqual: boolean = checkValuesEqual(password1Field.value, password2Field.value)

	// Check if the passwords are not equal, and they both been edited
	const displayPasswordsNotMatching: boolean =
		!arePasswordsEqual && password1Field.isTouched && password2Field.isTouched;

	// Check if we have any errors
	const hasErrors: boolean = emailField.hasError || password1Field.hasError || password2Field.hasError

	// Handle submit
	const { handleSubmit, isSubmitted} = useFormSubmission(async () => {
		if(hasErrors) return

		const dto = new SignupDTO(emailField.value, password1Field.value);

		await authCTX.signup(dto);
	})


	// Handle post-signup logic
	useEffect(() => {
		if (!authCTX.error && isSubmitted) {
			// Show a success message or redirect to a success page
			alert("Signup successful! Please log in to continue.");
			navigate("/login"); // Redirect to login page
		}
	}, [authCTX.error, isSubmitted]);

	return (
		<Layout>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

					<p className="mt-4 text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
						eaque error neque ipsa culpa autem, at itaque nostrum!
					</p>
				</div>

				<Form
					className="mx-auto mb-0 mt-8 max-w-md space-y-4"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div>
						<Input
							id="email"
							type="email"
							label="Email"
							hiddenLabel
							placeholder="Enter email"
							required
							value={emailField.value}
							onChange={emailField.handleInputChange}
							onBlur={emailField.handleInputBlur}
							inputIcon={emailIcon}
						></Input>

						{emailField.hasError && <InputError message="Email must contain an @ sign" />}
					</div>

					<div>
						<Input
							id="password1"
							type={password1InputType}
							label="Password 1"
							placeholder="Enter password"
							inputIcon={eyeIcon}
							hiddenLabel
							clickableIcon
							required
							value={password1Field.value}
							onChange={password1Field.handleInputChange}
							onBlur={password1Field.handleInputBlur}
							onClickIcon={togglePassword1Type}
						></Input>

						{password1Field.hasError && (
							<InputError message="Password has to have at least 8 chars" />
						)}
					</div>
					<div>
						<Input
							id="password2"
							type={password2InputType}
							label="Confirm password"
							placeholder="Confirm password"
							inputIcon={eyeIcon}
							hiddenLabel
							clickableIcon
							required
							value={password2Field.value}
							onChange={password2Field.handleInputChange}
							onBlur={password2Field.handleInputBlur}
							onClickIcon={togglePassword2Type}
						></Input>
						{password2Field.hasError && (
							<InputError message="Password has to have at least 8 chars" />
						)}
					</div>

					{displayPasswordsNotMatching && <InputError message="Passwords must match" />}

					<div>
						<Button
							type="submit"
							disabled={hasErrors}
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full disabled:bg-slate-400"
						>
							Create account
						</Button>
					</div>
				</Form>
				{authCTX.error && isSubmitted && <div className="error">{authCTX.error}</div>}
			</div>
		</Layout>
	);
};

export default Signup;
