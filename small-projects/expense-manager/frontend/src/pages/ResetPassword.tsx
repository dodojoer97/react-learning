// React
import type { FC, ChangeEvent } from "react";
import { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

// Translation
import { useTranslation } from "react-i18next";

// Store
import { sendResetPassword, clearError } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { isEmail } from "@/utils/utils";
import InputError from "@/components/UI/InputError";

const ResetPassword: FC = () => {
	const { t } = useTranslation(["login", "forms"]);

	// Redux
	const dispatch = useDispatch<AppDispatch>();

	// Store
	const { loading: loadingAuth, error: authError } = useSelector(
		(state: RootState) => state.auth
	);

	// Form fields
	const emailField = useInput<HTMLInputElement, string>({
		defaultValue: "",
		validationFn: (value: string) => {
			return isEmail(value);
		},
		clearErrorFN: () => dispatch(clearError()),
	});

	// Handle submit
	const {
		handleSubmit,
		isSubmitted,
		isLoading: isLoadingForm,
		error: formError,
	} = useFormSubmission(async () => {
		if (emailField.hasError) return;

		await dispatch(sendResetPassword({ email: emailField.value }));
	});

	const hasErrors: boolean = !!(formError || authError);

	return (
		<AuthFormWrapper title="Reset password">
			{isSubmitted && !hasErrors ? (
				// Render success message if form is successfully submitted
				<div className="text-center mt-6">
					<p>{t("forms:resetPasswordSuccessMessage")}</p>
				</div>
			) : (
				<Form onSubmit={handleSubmit}>
					<Input
						id="email"
						type="email"
						label={t("forms:enterEmail")}
						required
						disabled={isLoadingForm || loadingAuth}
						value={emailField.value}
						onChange={(e) =>
							emailField.handleInputChange(e as ChangeEvent<HTMLInputElement>)
						}
						onBlur={emailField.handleInputBlur}
						error={emailField.hasError ? t("forms:noEmailMatching") : undefined}
					/>
					<div className="flex justify-end mt-6">
						<Button
							disabled={isLoadingForm || loadingAuth || !!emailField.hasError}
							loading={loadingAuth || isLoadingForm}
							className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
						>
							Send Reset Link
						</Button>
					</div>
					{authError && <InputError message={authError} />}
				</Form>
			)}
		</AuthFormWrapper>
	);
};

export default ResetPassword;
