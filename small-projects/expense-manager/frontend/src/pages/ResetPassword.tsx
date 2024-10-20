// React
import type { FC } from "react";

// Components
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const ResetPassword: FC = () => {
	return (
		<AuthFormWrapper title="Reset password">
			<Form>
				<Input id="email" label="Email Address" type="email" required />
				<div className="flex justify-end mt-6">
					<Button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap">
						Send Reset Link
					</Button>
				</div>
			</Form>
		</AuthFormWrapper>
	);
};

export default ResetPassword;
