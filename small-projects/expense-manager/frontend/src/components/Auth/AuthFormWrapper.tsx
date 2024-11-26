// React
import type { FC, PropsWithChildren } from "react";

// Router
import { Link } from "react-router-dom";
// Images
import AuthImage from "@/images/auth-image.jpg";

interface Props extends PropsWithChildren {
	title: string;
}

const AuthFormWrapper: FC<Props> = ({ title, children }) => {
	return (
		<main className="bg-white dark:bg-gray-900">
			<div className="relative md:flex">
				{/* CONTENT */}
				<div className="md:w-1/2">
					<div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
						{/* Header */}
						<div>
							<div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
								{/* Logo */}
								<Link className="block" to="/">
									<svg
										className="fill-violet-500"
										xmlns="http://www.w3.org/2000/svg"
										width={32}
										height={32}
									>
										<path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
									</svg>
								</Link>
							</div>
						</div>
						<div className="max-w-sm mx-auto w-full px-4 py-8 flex-1">
							<h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
								{title}
							</h1>
							{children}
						</div>
					</div>
				</div>
				{/* Image */}
				<div
					className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
					aria-hidden="true"
				>
					<img
						className="object-cover object-center w-full h-full"
						src={AuthImage}
						width="760"
						height="1024"
						alt="Authentication"
					/>
				</div>
			</div>
		</main>
	);
};

export default AuthFormWrapper;
