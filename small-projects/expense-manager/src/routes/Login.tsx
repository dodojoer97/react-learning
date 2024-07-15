// React
import type { FC, FormEvent } from "react";
import { useContext, useEffect } from "react";

// Router
import { Link, useNavigate } from "react-router-dom";

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
import { isEmail, hasMinLength } from "@/utils/utils";

// Store
import { AuthContext } from "@/store/AuthContext";

// DTO
import LoginDTO from "@/DTO/request/Login";

const Login: FC = () => {


	// Navigation
	const navigate = useNavigate();

	// Store
	const authCTX = useContext(AuthContext);
	
	// Form fields
	const emailField = useInput("", (value: string) => {
		return isEmail(value);
	});

	const password1Field = useInput("", (value: string) => {
		return hasMinLength(value, 8);
	});

	// Toggle input type
	const { type: passwordInputType, toggleInputType } = useToggleInputType();

	// Check if we have any errors
	const hasErrors: boolean = emailField.hasError || password1Field.hasError



	// Handle submit
	const { handleSubmit, isSubmitted} = useFormSubmission(async () => {
		if(hasErrors) return

		const dto = new LoginDTO(emailField.value, password1Field.value);

		await authCTX.login(dto);
	})

	// Handle post-signup logic
	useEffect(() => {
		if (!authCTX.error && isSubmitted) {
			navigate("/"); // Redirect to login page
		}
	}, [authCTX.error, isSubmitted]);

	return (
		<Layout>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">Login</h1>

					<p className="mt-4 text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
						eaque error neque ipsa culpa autem, at itaque nostrum!
					</p>
				</div>

				<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
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
							id="password"
							type={passwordInputType}
							label="Password"
							placeholder="Enter password"
							inputIcon={eyeIcon}
							hiddenLabel
							clickableIcon
							required
							value={password1Field.value}
							onChange={password1Field.handleInputChange}
							onBlur={password1Field.handleInputBlur}
							onClickIcon={toggleInputType}
						></Input>

						{password1Field.hasError && (
							<InputError message="Password has to have at least 8 chars" />
						)}
					</div>

					{authCTX.error && <InputError message={authCTX.error} className="text-red-600"/>}


					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							No account?
							<Link to="/signup" className="underline">
								Sign up
							</Link>
						</p>

						<Button
							type="submit"
							disabled={hasErrors}
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
						>
							Sign in
						</Button>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Login;
