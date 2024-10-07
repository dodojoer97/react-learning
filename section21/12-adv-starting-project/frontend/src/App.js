// Challenge / Exercise
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// 1. Add five new (dummy) page components (content can be simple <h1> elements) - DONE
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
import HomePage from "./pages/HomePage"
import EventsPage, { loader as eventLoader } from "./pages/EventsPage"
import EventDetailPage, {
	loader as eventDetailLoader,
	action as deleteEventAction,
} from "./pages/EventDetailPage"
import NewEventPage from "./pages/NewEventPage"
import EditEventPage from "./pages/EditEventPage"
import RootLayout from "./pages/Root"

import EventsRootLayout from "./pages/EventsRoot"
import ErrorPage from "./pages/Error"

import { action as manipulateEventAction } from "./components/EventForm"

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "events",
				element: <EventsRootLayout />,
				children: [
					{
						index: true,
						element: <EventsPage />,
						loader: eventLoader,
					},
					{
						path: ":eventId",
						id: "event-detail",
						loader: eventDetailLoader,
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction,
							},

							{
								path: "edit",
								element: <EditEventPage />,
								action: manipulateEventAction,
							},
						],
					},
					{
						path: "new",
						element: <NewEventPage />,
						action: newEventAction,
						action: manipulateEventAction,
					},
				],
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
