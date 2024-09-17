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

// Svg
import emailIcon from "@/assets/email.svg";
import eyeIcon from "@/assets/eye.svg";

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
import Loader from "@/components/UI/Loader";

const Login: FC = () => {
	const { t } = useTranslation(["login", "forms"]);

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
	});

	const password1Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return hasMinLength(value, 8);
		},
		clearErrorFN: () => dispatch(clearError()),
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
			navigate("/settings");
		}

		return () => {
			setIsSubmitted(false);
		};
	}, [isSubmitted, isAuthenticated, navigate, error]);

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("loginTitle")}</h1>

				<p className="mt-4 text-gray-500">{t("loginDesc")}</p>
			</div>

			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
				<div>
					<Input
						id="email"
						type="email"
						label={t("forms:enterEmail")}
						hiddenLabel
						placeholder={t("forms:enterEmail")}
						required
						disabled={isLoadingForm}
						value={emailField.value}
						onChange={(e) =>
							emailField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
						}
						onBlur={emailField.handleInputBlur}
						inputIcon={emailIcon}
					></Input>
					{emailField.hasError && <InputError message={t("forms:noEmailMatching")} />}
				</div>

				<div>
					<Input
						id="password"
						type={passwordInputType}
						label={t("forms:enterPassword")}
						placeholder={t("forms:enterPassword")}
						inputIcon={eyeIcon}
						hiddenLabel
						clickableIcon
						required
						disabled={isLoadingForm}
						value={password1Field.value}
						onChange={(e) =>
							password1Field.handleInputChange(e as ChangeEvent<HTMLInputElement>)
						}
						onBlur={password1Field.handleInputBlur}
						onClickIcon={toggleInputType}
					></Input>

					{password1Field.hasError && (
						<InputError message={t("forms:notPasswordLength")} />
					)}
				</div>

				{error && <InputError message={error} className="text-red-600" />}

				<div className="flex items-center justify-between">
					<p className="text-sm text-gray-500">
						{t("noAccount")}
						<Link to="/signup" className="underline">
							{t("signup")}
						</Link>
					</p>

					<Button
						type="submit"
						disabled={hasErrors || isLoadingForm}
						className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
					>
						{isLoadingForm ? <Loader /> : t("signin")}
					</Button>
				</div>
			</Form>
		</Layout>
	);
};

export default Login;
