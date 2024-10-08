import {
	useRouteLoaderData,
	json,
	redirect,
	defer,
	Await,
} from "react-router-dom"

import EventItem from "../components/EventItem"
import EventsList from "../components/EventsList"
import { Suspense } from "react"

function EventDetailPage() {
	const { event, events } = useRouteLoaderData("event-detail")

	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<Await resolve={event}>
					{(loadeEvent) => <EventItem event={loadeEvent} />}
				</Await>
			</Suspense>
			<Suspense fallback={<p>Loading...</p>}>
				<Await resolve={events}>
					{(loadeEvents) => <EventItem event={loadeEvents} />}
				</Await>
			</Suspense>
		</>
	)
}

export default EventDetailPage

async function loadEvent(id) {
	const response = await fetch(`http://localhost:8080/events/${id}`)

	if (!response.ok) {
		throw json(
			{ message: "Could not getch details for event" },
			{ status: 500 }
		)
	} else {
		const resData = await response.json()
		return resData.event
	}
}

export async function loadeEvents() {
	const response = await fetch("http://localhost:8080/events")

	if (!response.ok) {
		// throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
		// 	status: 500,
		// })

		return json({ message: "Could not fetch events" }, { status: 500 })
	} else {
		const resData = response.json()
		return resData.events
	}
}

export async function loader({ request, params }) {
	const id = params.eventId
	return defer({
		event: await loadEvent(id), // will be loaded before the page will loaded because of await
		events: loadeEvents(), // will be loaded before the page is loaded
	})
}

export async function action({ params, request }) {
	const eventId = params.eventId
	const response = await fetch("http://localhost:8080/events/" + eventId, {
		method: request.method,
	})

	if (!response.ok) {
		throw json({ message: "could not deleted event" }, { status: 500 })
	}

	return redirect("/events")
}
