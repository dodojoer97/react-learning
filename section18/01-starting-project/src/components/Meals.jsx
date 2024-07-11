import { useState, useEffect } from "react";

// Components
import MealItem from "./MealItem";

// Hooks
import useHttp from "../hooks/useHttp";

// Create the config outside the function to avoid an infanent  loop
const config = {method: "GET"}

export default function Meals() {
	const {data: loadedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", config, [])


	return (
		<ul id="meals" >
			{loadedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
