"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
	return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
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
		return {
			message: "Invalid input",
		};
	}

	await saveMeal(meal);
	revalidatePath('/meals', 'layout') // This function allows you to purge cached data on-demand for a specific path.
	redirect("/meals");
}
