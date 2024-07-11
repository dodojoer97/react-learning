import { useState, useEffect } from "react";

// Components
import MealItem from "./MealItem";
import Error from "./Error";

// Hooks
import useHttp from "../hooks/useHttp";

// Create the config outside the function to avoid an infanent  loop
const config = {method: "GET"}

export default function Meals() {
	const {data: loadedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", config, [])

	if(isLoading) {
		return <p className="center">Fetching...</p>
	}
	
	if(error) {
		return <Error title="Fetched to fail meals" messsage={error}/>
	}

	return (

		<ul id="meals" >
			{loadedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
