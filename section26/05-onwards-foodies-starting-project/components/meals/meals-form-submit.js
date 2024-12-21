"use client";

import { useFormStatus } from "react-dom";
export default function MealsFormSubmit() {
	const { pending } = useFormStatus();

	return (
		<button dusabled={pending} type="submit">
			{pending ? "Saving..." : "Share Meal"}
		</button>
	);
}
