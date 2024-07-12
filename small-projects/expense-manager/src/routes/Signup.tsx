// React
import { useState } from "react";
import type { FC, FormEvent } from "react";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

// Svg
import emailIcon from "@/assets/email.svg";
import eyeIcon from "@/assets/eye.svg";

// Hooks
import useToggleInputType from "@/hooks/useToggleInputType";
import useInput from "@/hooks/useInput";

// Util
import { isEmail, hasMinLength } from "@/utils/utils";

const Signup: FC = () => {
	const {
		value: emailValue,
		handleInputChange: handleEmailChange,
		handleInputBlur: handleEmailBlur,
		hasError: emailHasError,
	} = useInput("", (value: string) => {
		return isEmail(value);
	});

	const {
		value: password1Value,
		handleInputChange: handlePassword1Change,
		handleInputBlur: handlePassword1Blur,
		hasError: password1HasError,
	} = useInput("", (value: string) => {
		return hasMinLength(value, 8);
	});

	const {
		value: password2Value,
		handleInputChange: handlePassword2Change,
		handleInputBlur: handlePassword2Blur,
		hasError: password2HasError,
	} = useInput("", (value: string) => {
		return hasMinLength(value, 8);
	});

	// Check if the passowrds are equal
	const arePasswordsEqual: boolean = password2Value === password1Value;

	const { type: password1InputType, toggleInputType: togglePassword1Type } = useToggleInputType();
	const { type: password2InputType, toggleInputType: togglePassword2Type } = useToggleInputType();

	// Handle submit
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const formDataObj = Object.fromEntries(formData.entries());
	};

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
							value={emailValue}
							onChange={handleEmailChange}
							onBlur={handleEmailBlur}
							inputIcon={emailIcon}
						></Input>

						{emailHasError && <div>error</div>}
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
							value={emailValue}
							onChange={handleEmailChange}
							onBlur={handleEmailBlur}
							onClickIcon={togglePassword1Type}
						></Input>
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
							onClickIcon={togglePassword2Type}
						></Input>
					</div>

					<div>
						<Button
							type="submit"
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
						>
							Create account
						</Button>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Signup;
