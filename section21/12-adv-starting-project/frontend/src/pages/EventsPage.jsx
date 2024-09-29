import {useLoaderData} from "react-router-dom"

import EventList from "../components/EventsList"

function EventsPage() {
    const events = useLoaderData()

    return <>
         <h1>EventsPage</h1>
         <EventList events={events}/>
    </>
}

export default EventsPage