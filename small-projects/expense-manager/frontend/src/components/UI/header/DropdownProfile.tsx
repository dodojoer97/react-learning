import React, { useState, useRef, useEffect, FC, useContext } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/authSlice";

import { Link } from "react-router-dom";
import Transition from "../Transition";

// Translation
import { useTranslation } from "react-i18next";

// Store
import UserAvatar from "@/images/user-avatar-32.png";

// Store
interface DropdownProfileProps {
	align?: "left" | "right";
}

const DropdownProfile: FC<DropdownProfileProps> = ({ align = "left" }) => {
	const { t } = useTranslation("header");
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);

	// Store

	// State
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const trigger = useRef<HTMLButtonElement>(null);
	const dropdown = useRef<HTMLDivElement>(null);

	// Close on click outside
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			const { target } = event;
			if (!dropdown.current || !trigger.current) return;
			if (
				!dropdownOpen ||
				dropdown.current.contains(target as Node) ||
				trigger.current.contains(target as Node)
			)
				return;
			setDropdownOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, [dropdownOpen]);

	// Close if the esc key is pressed
	useEffect(() => {
		const keyHandler = (event: KeyboardEvent) => {
			if (!dropdownOpen || event.keyCode !== 27) return;
			setDropdownOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	}, [dropdownOpen]);

	// Methods
	const handleSignout = (): void => {
		dispatch(logout());
	};

	return (
		<div className="relative inline-flex">
			<button
				ref={trigger}
				className="inline-flex justify-center items-center group"
				aria-haspopup="true"
				onClick={() => setDropdownOpen(!dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<img
					className="w-8 h-8 rounded-full"
					src={UserAvatar}
					width="32"
					height="32"
					alt="User"
				/>
				<div className="flex items-center truncate">
					<span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
						{t("header:expenseManager")}
					</span>
					<svg
						className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
						viewBox="0 0 12 12"
					>
						<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
					</svg>
				</div>
			</button>

			<Transition
				className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
					align === "right" ? "right-0" : "left-0"
				}`}
				show={dropdownOpen}
				enter="transition ease-out duration-200 transform"
				enterStart="opacity-0 -translate-y-2"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-out duration-200"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
			>
				<div
					ref={dropdown}
					onFocus={() => setDropdownOpen(true)}
					onBlur={() => setDropdownOpen(false)}
				>
					<div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
						<div className="font-medium text-gray-800 dark:text-gray-100">
							{t("header:expenseManager")}
						</div>
						<div className="text-xs text-gray-500 dark:text-gray-400 italic">
							{/* TODO, add a field for username in signup */}
							{user?.displayName}
						</div>
					</div>
					<ul>
						{user && (
							<>
								<li>
									<Link
										className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
										to="/settings/preferences"
										onClick={() => setDropdownOpen(!dropdownOpen)}
									>
										{t("header:settings")}
									</Link>
								</li>
								<li>
									<Link
										className="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
										to="/auth/login"
										onClick={handleSignout}
									>
										{t("header:logout")}
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</Transition>
		</div>
	);
};

export default DropdownProfile;