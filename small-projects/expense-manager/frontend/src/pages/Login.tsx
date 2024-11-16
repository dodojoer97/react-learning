import type { ChangeEvent, FC } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Translation
import { useTranslation } from "react-i18next";

// Router
import { Link, useNavigate } from "react-router-dom";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Hooks
import useToggleInputType from "@/hooks/useToggleInputType";
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { isEmail, hasMinLength } from "@/utils/utils";

// Store
import { login, clearError } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

// DTO
import LoginDTO from "@/DTO/request/Login";
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";

// FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: FC = () => {
	const { t } = useTranslation(["login", "forms", "errors"]);

	// Redux
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { error, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

	// Form fields
	const emailField = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return isEmail(value);
		},
		clearErrorFN: () => dispatch(clearError()),
		errorMessage: t("errors:noEmailMatching"),
	});

	const password1Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return hasMinLength(value, 8);
		},
		clearErrorFN: () => dispatch(clearError()),
		errorMessage: t("errors:notPasswordLength"),
	});

	// Toggle input type
	const { type: passwordInputType, toggleInputType } = useToggleInputType();

	// Check if we have any errors
	const hasErrors: boolean = emailField.hasError || password1Field.hasError;

	// Handle submit
	const {
		handleSubmit,
		isSubmitted,
		setIsSubmitted,
		isLoading: isLoadingForm,
	} = useFormSubmission(async () => {
		if (hasErrors) return;

		const dto = new LoginDTO(emailField.value, password1Field.value);

		await dispatch(login(dto));
	});

	useEffect(() => {
		if (!error && isSubmitted && isAuthenticated) {
			navigate("/settings/preferences");
		}

		return () => {
			setIsSubmitted(false);
		};
	}, [isSubmitted, isAuthenticated, navigate, error]);

	return (
		<AuthFormWrapper title={t("login:loginTitle")}>
			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
				<div className="space-y-4">
					<Input
						id="email"
						type="email"
						label={t("forms:enterEmail")}
						required
						disabled={isLoadingForm}
						value={emailField.value}
						onChange={(e) =>
							emailField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
						}
						onBlur={emailField.handleInputBlur}
						error={emailField.errorMessage}
					></Input>

					<Input
						id="password"
						type={passwordInputType}
						label={t("errors:enterPassword")}
						inputIcon={passwordInputType === "text" ? faEyeSlash : faEye}
						required
						disabled={isLoadingForm}
						value={password1Field.value}
						onChange={(e) =>
							password1Field.handleInputChange(e as ChangeEvent<HTMLInputElement>)
						}
						onBlur={password1Field.handleInputBlur}
						onClickIcon={toggleInputType}
						error={password1Field.errorMessage}
					></Input>

					{password1Field.hasError && (
						<InputError message={t("errors:notPasswordLength")} />
					)}

					{error && <InputError message={error} className="text-red-600" />}
				</div>
				<div className="flex items-center justify-between mt-6">
					<div className="mr-1">
						<Link
							className="text-sm underline hover:no-underline"
							to="/auth/reset-password"
						>
							{t("login:forgotPassword")}
						</Link>
					</div>

					<Button
						type="submit"
						disabled={hasErrors || loading || isLoadingForm}
						className="btn  bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white  whitespace-nowrap"
						loading={loading || isLoadingForm}
					>
						{t("login:signin")}
					</Button>
				</div>
			</Form>
			{/* FOOTER */}
			<div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
				<div className="text-sm">
					{t("login:noAccount")}{" "}
					<Link
						className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
						to="/auth/signup"
					>
						{t("login:signup")}{" "}
					</Link>
				</div>
			</div>
		</AuthFormWrapper>
	);
};

export default Login;
