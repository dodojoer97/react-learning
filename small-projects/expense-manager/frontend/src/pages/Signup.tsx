// React
import { useEffect } from "react";
import type { ChangeEvent, FC } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { signup, clearError } from "@/store/authSlice";

// Translation
import { useTranslation } from "react-i18next";

// Router
import { Link, useNavigate } from "react-router-dom";

// Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";
import Loader from "@/components/UI/Loader";
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";

// Hooks
import useToggleInputType from "@/hooks/useToggleInputType";
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { isEmail, hasMinLength, checkValuesEqual } from "@/utils/utils";

// DTO
import RegisterDTO from "@/DTO/request/Register";

// FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup: FC = () => {
	const { t, ready } = useTranslation(["signup", "forms"]);
	if (!ready) {
		return <div>Loading...</div>; // Or some loading spinner
	}

	// Redux Store
	const dispatch = useDispatch<AppDispatch>();
	const { error, loading } = useSelector((state: RootState) => state.auth); // Fetch auth state from Redux

	// Navigation
	const navigate = useNavigate();

	// Email field
	const emailField = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => isEmail(value),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
	});

	// Password fields
	const password1Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => hasMinLength(value, 8),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
	});

	const password2Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => hasMinLength(value, 8),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
	});

	// Input type togglers
	const { type: password1InputType, toggleInputType: togglePassword1Type } = useToggleInputType();
	const { type: password2InputType, toggleInputType: togglePassword2Type } = useToggleInputType();

	// Check if the passwords are equal
	const arePasswordsEqual: boolean = checkValuesEqual(password1Field.value, password2Field.value);

	// Check if the passwords are not equal, and they both been edited
	const displayPasswordsNotMatching: boolean =
		!arePasswordsEqual && password1Field.isTouched && password2Field.isTouched;

	// Check if we have any errors
	const hasErrors: boolean =
		emailField.hasError || password1Field.hasError || password2Field.hasError;

	// Handle submit
	const { handleSubmit, isSubmitted, setIsSubmitted, isLoading } = useFormSubmission(async () => {
		if (hasErrors) return;

		const dto = new RegisterDTO(emailField.value, password1Field.value);
		await dispatch(signup(dto)); // Dispatch the signup action
	});

	// Handle post-signup logic
	useEffect(() => {
		if (!error && isSubmitted) {
			// Show a success message or redirect to a success page
			alert("Signup successful! Please log in to continue.");
			navigate("/login"); // Redirect to login page
		}

		return () => {
			setIsSubmitted(false);
		};
	}, [isSubmitted, navigate, error]);

	return (
		<AuthFormWrapper title="Create your Account">
			<Form onSubmit={(e) => handleSubmit(e)}>
				<div className="space-y-4">
					<div>
						<Input
							id="email"
							type="email"
							label={t("forms:enterEmail")}
							required
							value={emailField.value}
							onChange={(e) =>
								emailField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
							}
							onBlur={emailField.handleInputBlur}
						></Input>
						{emailField.hasError && <InputError message={t("forms:noEmailMatching")} />}
					</div>
					<div>
						<Input
							id="password1"
							type={password1InputType}
							label={t("forms:enterPassword") + "1"}
							inputIcon={password1InputType === "text" ? faEyeSlash : faEye}
							required
							value={password1Field.value}
							onChange={(e) =>
								password1Field.handleInputChange(e as ChangeEvent<HTMLInputElement>)
							}
							onBlur={password1Field.handleInputBlur}
							onClickIcon={togglePassword1Type}
						></Input>
						{password1Field.hasError && (
							<InputError message={t("forms:notPasswordLength")} />
						)}
					</div>
					<div>
						<Input
							id="password2"
							type={password2InputType}
							label={t("forms:enterPassword") + "2"}
							inputIcon={password2InputType === "text" ? faEyeSlash : faEye}
							required
							value={password2Field.value}
							onChange={(e) =>
								password2Field.handleInputChange(e as ChangeEvent<HTMLInputElement>)
							}
							onBlur={password2Field.handleInputBlur}
							onClickIcon={togglePassword2Type}
						></Input>
						{password2Field.hasError && (
							<InputError message={t("forms:notPasswordLength")} />
						)}
					</div>
					{displayPasswordsNotMatching && (
						<InputError message={t("forms:notMatchingPasswords")} />
					)}
					{error && <InputError message={error} className="text-red-600" />}
					<Button
						type="submit"
						disabled={hasErrors || isLoading || loading}
						className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white  whitespace-nowrap"
					>
						{isLoading || loading ? <Loader /> : t("signup:createAccount")}
					</Button>
				</div>
			</Form>
			{/* FOOTER */}
			<div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
				<div className="text-sm">
					Have an account?{" "}
					<Link
						className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
						to="/login"
					>
						Sign In
					</Link>
				</div>
			</div>
		</AuthFormWrapper>
	);
};

export default Signup;
