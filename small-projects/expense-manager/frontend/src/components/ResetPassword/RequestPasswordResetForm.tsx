// React
import type { FC, ChangeEvent } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

// Translation
import { useTranslation } from "react-i18next";

// Store
import { sendResetPasswordEmail, clearError } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

// Hooks
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { isEmail } from "@/utils/utils";
import InputError from "@/components/UI/InputError";

const RequestPasswordResetForm: FC = () => {
	const { t } = useTranslation(["forms", "resetPassword", "errors"]);

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
		errorMessage: t("errors:noEmailMatching"),
	});

	// Handle submit
	const {
		handleSubmit,
		isSubmitted,
		isLoading: isLoadingForm,
		error: formError,
	} = useFormSubmission(async () => {
		if (emailField.hasError) return;

		await dispatch(sendResetPasswordEmail({ email: emailField.value }));
	});

	const hasErrors: boolean = !!(formError || authError);

	return (
		<>
			{isSubmitted && !hasErrors ? (
				// Render success message if form is successfully submitted
				<div className="text-center mt-6">
					<p>{t("resetPassword:emailSent")}</p>
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
						error={emailField.errorMessage}
					/>
					<div className="flex justify-end mt-6">
						<Button
							disabled={isLoadingForm || loadingAuth || !!emailField.hasError}
							loading={loadingAuth || isLoadingForm}
							className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
						>
							{t("resetPassword:sendLink")}
						</Button>
					</div>
					{authError && <InputError message={authError} />}
				</Form>
			)}
		</>
	);
};

export default RequestPasswordResetForm;
