// React
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";

import ResetPasswordForm from "@/components/ResetPassword/ResetPasswordForm";
import RequestPasswordResetForm from "@/components/ResetPassword/RequestPasswordResetForm";

const ResetPassword: FC = () => {
	const [params] = useSearchParams();

	const token = params.get("token");

	return (
		<AuthFormWrapper title="Reset password">
			{/* IF we have the token the reset password form should be loaded, to enable to user to edit */}
			{token && <ResetPasswordForm />}

			{!token && <RequestPasswordResetForm />}
		</AuthFormWrapper>
	);
};

export default ResetPassword;
