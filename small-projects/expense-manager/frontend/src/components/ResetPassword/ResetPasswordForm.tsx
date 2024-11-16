// React
import type { FC, ChangeEvent } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Translation
import { useTranslation } from "react-i18next";

// Store
import { resetPassword, clearError, logout } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";
import useToggleInputType from "@/hooks/useToggleInputType";

// Util
import { hasMinLength } from "@/utils/utils";

// FontAweomse
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
	token: string;
}

const ResetPasswordForm: FC<Props> = ({ token }) => {
	const { t } = useTranslation(["forms", "resetPassword"]);

	// Redux
	const dispatch = useDispatch<AppDispatch>();

	// Store
	const { loading: loadingAuth, error: authError } = useSelector(
		(state: RootState) => state.auth
	);

	// Password fields
	const password1Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => hasMinLength(value, 8),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
		errorMessage: t("errors:notPasswordLength"),
	});

	const password2Field = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => hasMinLength(value, 8),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
		errorMessage: t("errors:notPasswordLength"),
	});

	// Input type togglers
	const { type: password1InputType, toggleInputType: togglePassword1Type } = useToggleInputType();
	const { type: password2InputType, toggleInputType: togglePassword2Type } = useToggleInputType();

	// Check if the passwords are equal
	const arePasswordsEqual: boolean = password1Field.value === password2Field.value;

	// Check if the passwords are not equal, and they both been edited
	const displayPasswordsNotMatching: boolean =
		!arePasswordsEqual && password1Field.isTouched && password2Field.isTouched;

	// Handle submit
	const {
		handleSubmit,
		isSubmitted,
		isLoading: isLoadingForm,
		error: formError,
	} = useFormSubmission(async () => {
		if (password1Field.hasError) return;

		await dispatch(resetPassword({ password: password1Field.value, token }));
		dispatch(logout());
	});

	// Check if we have any errors
	const hasErrors: boolean =
		password1Field.hasError || password2Field.hasError || !!(formError || authError);

	return (
		<>
			{isSubmitted && !hasErrors ? (
				// Render success message if form is successfully submitted
				<div className="text-center mt-6">
					<p>{t("resetPassword:resetPasswordSuccessMessage")}</p>
				</div>
			) : (
				<Form onSubmit={handleSubmit}>
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
						error={password1Field.errorMessage}
					></Input>
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
						error={password2Field.errorMessage}
					></Input>

					{displayPasswordsNotMatching && (
						<InputError message={t("errors:notMatchingPasswords")} />
					)}

					<div className="flex justify-end mt-6">
						<Button
							disabled={isLoadingForm || loadingAuth}
							loading={loadingAuth || isLoadingForm}
							className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
						>
							{t("resetPassword:resetPassword")}
						</Button>
					</div>
					{authError && <InputError message={authError} />}
				</Form>
			)}
		</>
	);
};

export default ResetPasswordForm;
