import { useState } from "react"

import { Link, Outlet, useNavigate, useParams } from "react-router-dom"

import { useQuery, useMutation } from "@tanstack/react-query"
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js"

import Header from "../Header.jsx"
import ErrorBlock from "../UI/ErrorBlock.jsx"
import Modal from "../UI/Modal.jsx"

export default function EventDetails() {
	const [isDeleting, setIsDeleting] = useState(false)

	const { id } = useParams()

	const navigate = useNavigate()

	const {
		data,
		isPending: isFetchEventPending,
		isError: isFetchEventError,
		error: fetchEventError,
	} = useQuery({
		queryKey: ["events", id],
		queryFn: ({ signal }) => fetchEvent({ id, signal }),
	})

	const {
		mutate,
		isPending: isDeletePending,
		isError,
		error,
	} = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["events"],
				exact: false, // if exact is not sent or false, any query with 'events' will be re executed
				refetchType: "none", // will not be triggered immediately
			})
			navigate("/events")
		},
	})

	function handleStartDelete() {
		setIsDeleting(true)
	}

	function handleStopDelete() {
		setIsDeleting(false)
	}

	const handleDelete = () => {
		mutate({ id })
	}

	return (
		<>
			{isDeleting && (
				<Modal onClose={handleStopDelete}>
					<h2>title</h2>
					<p>sure?</p>

					<div className='form-actions'>
						<button onClick={handleStopDelete}> cancel</button>
						<button onClick={handleDelete}>delete</button>
					</div>
				</Modal>
			)}
			<Outlet />
			<Header>
				<Link
					to='/events'
					className='nav-item'>
					View all Events
				</Link>
			</Header>

			{isFetchEventPending && "Loading event data"}

			{isFetchEventError && (
				<ErrorBlock
					title='Error getting event details'
					message={fetchEventError.message}
				/>
			)}

			{data && (
				<article id='event-details'>
					<header>
						<h1>{data.title}</h1>
						<nav>
							{isDeletePending && "DELETING"}
							{!isDeletePending && (
								<button onClick={handleStartDelete}>Delete</button>
							)}
							<Link to='edit'>Edit</Link>
						</nav>
					</header>
					<div id='event-details-content'>
						<img
							src={"http://localhost:3000/" + data.image}
							alt=''
						/>
						<div id='event-details-info'>
							<div>
								<p id='event-details-location'>{data.location}</p>
								<time dateTime={`Todo-DateT$Todo-Time`}>
									{data.date} @ {data.time}
								</time>
							</div>
							<p id='event-details-description'>{data.description}</p>
						</div>
					</div>
				</article>
			)}

			{isError && (
				<ErrorBlock
					title='Failed to create event'
					message={error.message || "Failed"}
				/>
			)}
		</>
	)
}
