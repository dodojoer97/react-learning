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
} from "./pages/EventDetailPage"
import NewEventPage from "./pages/NewEventPage"
import EditEventPage from "./pages/EditEventPage"
import RootLayout from "./pages/Root"

import EventsRootLayout from "./pages/EventsRoot"
import ErrorPage from "./pages/Error"

// 2. Add routing & route definitions for these five pages - DONE
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage

// 3. Add a root layout that adds the <MainNavigation> component above all page components - DONE

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
						element: <EventDetailPage />,
						loader: eventDetailLoader,
					},
					{ path: "new", element: <NewEventPage /> },
					{ path: ":eventId/edit", element: <EditEventPage /> },
				],
			},
		],
	},
])

// 4. Add properly working links to the MainNavigation - DONE
// 5. Ensure that the links in MainNavigation receive an "active" class when active - DONE

// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage - DONE
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
	return <RouterProvider router={router} />
}

export default App
