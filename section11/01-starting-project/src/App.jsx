import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
	const selectedPlace = useRef();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

	// Fires only after the componet was rendered
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.altitude, position.coords.longitude);
			setAvailablePlaces(sortedPlaces);
		});
	}, []); // IF we add a dependency, it will be fired when those depenecies change

	function handleStartRemovePlace(id) {
		setIsModalOpen(true);
		selectedPlace.current = id;
	}

	function handleStopRemovePlace() {
		setIsModalOpen(false);
	}

	function handleSelectPlace(id) {
		setPickedPlaces((prevPickedPlaces) => {
			if (prevPickedPlaces.some((place) => place.id === id)) {
				return prevPickedPlaces;
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [place, ...prevPickedPlaces];
		});

		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

		if (storedIds.includes(id)) return;

		localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
	}

	// With useCallback, react make sure the function is not recreated but re used when the component re executes
	const handleRemovePlace = useCallback(function () {
		setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
		setIsModalOpen(false);
		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
		localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
	}, []);

	return (
		<>
			<Modal open={isModalOpen}>
				<DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
			</Modal>

			<header>
				<img src={logoImg} alt="Stylized globe" />
				<h1>PlacePicker</h1>
				<p>Create your personal collection of places you would like to visit or you have visited.</p>
			</header>
			<main>
				<Places title="I'd like to visit ..." fallbackText={"Select the places you would like to visit below."} places={pickedPlaces} onSelectPlace={handleStartRemovePlace} />
				<Places title="Available Places" places={availablePlaces} onSelectPlace={handleSelectPlace} fallbackText="Sorting places by distance..." />
			</main>
		</>
	);
}

export default App;
