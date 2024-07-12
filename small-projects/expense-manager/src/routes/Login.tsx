// React
import { FC } from "react";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";

// Svg
import emailIcon from "@/assets/email.svg";
import eyeIcon from "@/assets/eye.svg";

const Login: FC = () => {
	return (
		<Layout>
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

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
							inputIcon={emailIcon}
						></Input>
					</div>

					<div>
						<Input
							id="password"
							type="password"
							label="Password"
							hiddenLabel
							placeholder="Enter password"
							inputIcon={eyeIcon}
						></Input>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							No account?
							<a className="underline" href="#">
								Sign up
							</a>
						</p>

						<button
							type="submit"
							className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
						>
							Sign in
						</button>
					</div>
				</Form>
			</div>
		</Layout>
	);
};

export default Login;
