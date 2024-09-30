import EventList from "../components/EventsList"

function EventsPage() {
	const data = useLoaderData()

	if (data.isError) {
		return <p>{data.message}</p>
	}

	const events = data.events // loader automatically extracts the data

	return (
		<>
			<h1>EventsPage</h1>
			<EventList events={events} />
		</>
	)
}

export default EventsPage

export async function loader() {
	const response = await fetch("http://localhost:8080/events")

	if (!response.ok) {
		throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
			status: 500,
		})
	} else {
		return response
	}
}
