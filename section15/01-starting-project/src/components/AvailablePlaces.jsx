import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import ErrorComp from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// If you will not use use effect there will be an infenant loop
	useEffect(() => {
		async function fetchPlaces() {
			setIsLoading(true);
			try {
				const places = await fetchAvailablePlaces();
				navigator.geolocation.getCurrentPosition((position) => {
					const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
					setAvailablePlaces(sortedPlaces);
					setIsLoading(false);
				});
			} catch (err) {
				setError({ message: err.message || "Could not fetch" });
				setIsLoading(false);
			}
		}

		fetchPlaces();
	}, []);

	if (error) {
		return <ErrorComp title="ERROR" message={error.message} />;
	}

	return <Places isLoading={isLoading} loadingText="Fetching place data.." title="Available Places" places={availablePlaces} fallbackText="No places available." onSelectPlace={onSelectPlace} />;
}
