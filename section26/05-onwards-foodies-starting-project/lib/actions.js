"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
	return !text || text.trim() === "";
}

export async function shareMeal(formData) {
	"use server";
	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructions: formData.get("instructions"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	if (isInvalidText(meal.title) || !meal.image || meal.image.size === 0) {
		// ... add more as needed
		throw new Error("Invalid data");
	}

	await saveMeal(meal);
	redirect("/meals");
}
