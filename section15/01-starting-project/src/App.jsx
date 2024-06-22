import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import ErrorComp from "./components/Error.jsx";

import { updateUserPlaces, fetchUserPlaces } from "./http.js";

function App() {
	const selectedPlace = useRef();

	const [userPlaces, setUserPlaces] = useState([]);
	const [fetchingUserPlaces, setFetchingUserPlaces] = useState(false);
	const [errorFetchingPlaces, setErrorFetchingPlaces] = useState(null);

	const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	useEffect(() => {
		async function handleFetchUserPlaces() {
			setFetchingUserPlaces(true);
			try {
				const data = await fetchUserPlaces();
				setUserPlaces(data);
			} catch (err) {
				setFetchingUserPlaces(false);
				setErrorFetchingPlaces({ message: err.message || "Failed to fetch user places" });
			}
			setFetchingUserPlaces(false);
		}

		handleFetchUserPlaces();
	}, []);

	function handleStartRemovePlace(place) {
		setModalIsOpen(true);
		selectedPlace.current = place;
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);
	}

	async function handleSelectPlace(selectedPlace) {
		setUserPlaces((prevPickedPlaces) => {
			if (!prevPickedPlaces) {
				prevPickedPlaces = [];
			}
			if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
				return prevPickedPlaces;
			}
			return [selectedPlace, ...prevPickedPlaces];
		});

		try {
			await updateUserPlaces([selectedPlace, ...userPlaces]);
		} catch (err) {
			setUserPlaces(userPlaces);
			errorUpdatingPlaces({ message: err.message || "Failed to update places" });
		}
	}

	const handleRemovePlace = useCallback(
		async function handleRemovePlace() {
			setUserPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id));
			try {
				await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
			} catch (err) {
				setUserPlaces(userPlaces);
				setErrorUpdatingPlaces({ message: err.message || "error updating" });
			}

			setModalIsOpen(false);
		},
		[userPlaces]
	);

	function handleError() {
		setErrorUpdatingPlaces(null);
	}

	return (
		<>
			<Modal open={errorUpdatingPlaces} onClose={handleError}>
				{errorUpdatingPlaces && <ErrorComp title="An error occured!" message={errorUpdatingPlaces.message} onConfirm={handleError} />}
			</Modal>
			<Modal open={errorFetchingPlaces} onClose={handleError}>
				{errorFetchingPlaces && <ErrorComp title="An error occured!" message={errorFetchingPlaces.message} onConfirm={handleError} />}
			</Modal>
			<Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
				<DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
			</Modal>

			<header>
				<img src={logoImg} alt="Stylized globe" />
				<h1>PlacePicker</h1>
				<p>Create your personal collection of places you would like to visit or you have visited.</p>
			</header>
			<main>
				{fetchingUserPlaces && <p>WAIT</p>}
				{!fetchingUserPlaces && <Places title="I'd like to visit ..." fallbackText="Select the places you would like to visit below." places={userPlaces} onSelectPlace={handleStartRemovePlace} />}

				<AvailablePlaces onSelectPlace={handleSelectPlace} />
			</main>
		</>
	);
}

export default App;
