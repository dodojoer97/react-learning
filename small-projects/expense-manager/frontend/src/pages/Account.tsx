import React, { useState, useRef } from "react";
import type { ChangeEvent } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// UI Components
import Input from "@/components/UI/Input";

// Util
import { isEmail, hasMinLength } from "@/utils/utils";

// Store
import { clearError, updateUserInfo } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

// Hooks
import useInput from "@/hooks/useInput";
import InputError from "@/components/UI/InputError";
import useFormSubmission from "@/hooks/useFormSubmission";

// Translations
import { useTranslation } from "react-i18next";
import Form from "@/components/UI/Form";
import Button from "@/components/UI/Button";
import { Link } from "react-router-dom";

const AccountPanel: React.FC = () => {
	// Translations
	const { t } = useTranslation(["signup", "forms"]);

	// Redux
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);

	if (!user) return <>No user</>;

	// Form fields
	const emailField = useInput<HTMLInputElement, string>({
		defaultValue: user.email,
		validationFn: (value: string) => {
			return isEmail(value);
		},
		clearErrorFN: () => dispatch(clearError()),
	});

	// Name field
	const nameField = useInput<HTMLInputElement, string>({
		defaultValue: user.displayName,
		validationFn: (value: string) => hasMinLength(value, 3),
		clearErrorFN: () => dispatch(clearError()), // Dispatch clear error action
	});

	const { handleSubmit, isLoading, error } = useFormSubmission(async () => {
		await dispatch(updateUserInfo({ displayName: nameField.value, email: emailField.value }));
	});

	const handleReset = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		emailField.reset();
		nameField.reset();
	};

	const areButtonsDisabled: boolean = !!(
		isLoading ||
		error ||
		emailField.hasError ||
		nameField.hasError
	);
	return (
		<div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl mb-8">
			<Form onSubmit={(e) => handleSubmit(e)}>
				<div className="grow">
					{/* Panel body */}
					<div className="p-6 space-y-6">
						<h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
							My Account
						</h2>
						{/* Personal Info */}
						<section>
							<h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
								Personal Info
							</h2>
							<div className="text-sm">
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
								officia deserunt mollit.
							</div>
							<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
								<div className="sm:w-1/3">
									<Input
										id="name"
										type="text"
										label={"Name"}
										required
										disabled={isLoading}
										value={nameField.value}
										onChange={(e) =>
											nameField.handleInputChange(
												e as ChangeEvent<HTMLInputElement>
											)
										}
										onBlur={nameField.handleInputBlur}
									></Input>
									{nameField.hasError && <InputError message={"Some error"} />}
								</div>
							</div>
						</section>
						{/* Email */}
						<section>
							<h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
								Email
							</h2>
							<div className="text-sm">
								Excepteur sint occaecat cupidatat non proident sunt in culpa qui
								officia.
							</div>
							<div className="flex flex-wrap mt-5">
								<div className="mr-2">
									<Input
										id="email"
										type="email"
										label={t("forms:enterEmail")}
										required
										disabled={isLoading}
										value={emailField.value}
										onChange={(e) =>
											emailField.handleInputChange(
												e as ChangeEvent<HTMLInputElement>
											)
										}
										onBlur={emailField.handleInputBlur}
									></Input>
									{emailField.hasError && (
										<InputError message={t("forms:noEmailMatching")} />
									)}
								</div>
							</div>
						</section>
						{/* Password */}
						<section>
							<h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
								Password
							</h2>
							<div className="mt-5">
								<Link
									to={"/auth/reset-password"}
									target="_blank"
									className="btn border-gray-200 dark:border-gray-700/60 shadow-sm text-violet-500"
								>
									Set New Password
								</Link>
							</div>
						</section>
					</div>
					{/* Panel footer */}
					<footer>
						<div className="flex flex-col px-6 py-5 border-t border-gray-200 dark:border-gray-700/60">
							<div className="flex self-end">
								<Button
									disabled={areButtonsDisabled}
									onClick={(e: React.FormEvent<HTMLFormElement>) =>
										handleReset(e)
									}
									className="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
								>
									Cancel
								</Button>
								<Button
									disabled={areButtonsDisabled}
									loading={isLoading}
									className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
								>
									Save Changes
								</Button>
							</div>
						</div>
					</footer>
				</div>
			</Form>
		</div>
	);
};

export default AccountPanel;