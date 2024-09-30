import EventList from "../components/EventsList"

function EventsPage() {
	return (
		<>
			<h1>EventsPage</h1>
			<EventList />
		</>
	)
}

export default EventsPage

export async function loader() {
	const response = await fetch("http://localhost:8080/events")

	if (!response.ok) {
		// ...
	} else {
		return response
	}
}
