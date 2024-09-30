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

export async function loader() {}
