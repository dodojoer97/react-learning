// React
import { FC } from "react";

// Router
import { Link } from "react-router-dom";

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

const Login: FC = () => {
	const { type: passwordInputType, toggleInputType } = useToggleInputType();
	return (
		<Layout>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">Login</h1>

					<p className="mt-4 text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
						eaque error neque ipsa culpa autem, at itaque nostrum!
					</p>
				</div>

				<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
					<div>
						<Input
							id="email"
							type="email"
							label="Email"
							hiddenLabel
							placeholder="Enter email"
							required
							inputIcon={emailIcon}
						></Input>
					</div>

					<div>
						<Input
							id="password"
							type={passwordInputType}
							label="Password"
							placeholder="Enter password"
							inputIcon={eyeIcon}
							hiddenLabel
							clickableIcon
							required
							onClickIcon={toggleInputType}
						></Input>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							No account?
							<Link to="/signup" className="underline">
								Sign up
							</Link>
						</p>

						<Button
							type="submit"
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
						>
							Sign in
						</Button>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Login;
