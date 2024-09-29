import { useEffect, useState } from "react"

import EventList from "../components/EventsList"



function EventsPage() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/events")
            const {events} = await response.json()

            setEvents(events)
        }

        fetchData()

    }, [])


    return <>
         <h1>EventsPage</h1>
         <EventList events={events}/>
    </>
}

export default EventsPage