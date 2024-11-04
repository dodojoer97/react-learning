import {
	Link,
	redirect,
	useNavigate,
	useParams,
	useSubmit,
	useNavigation,
} from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"

import Modal from "../UI/Modal.jsx"
import EventForm from "./EventForm.jsx"
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js"
import ErrorBlock from "../UI/ErrorBlock.jsx"

export default function EditEvent() {
	const navigate = useNavigate()
	const { state } = useNavigation()
	const submit = useSubmit()
	const { id } = useParams()

	const { data, isError, error } = useQuery({
		queryKey: ["events", id],
		queryFn: ({ signal }) => fetchEvent({ id, signal }),
	})

	// const { mutate } = useMutation({
	// 	mutationFn: updateEvent,
	// 	onMutate: async ({id, event}) => {
	// 		await queryClient.cancelQueries({queryKey: ['events', id]}) // cancel ongoing queries
	// 		const previousEvent = queryClient.getQueryData(['events', id])
	// 		queryClient.setQueryData(['events', id], event)

	// 		return {
	// 			previousEvent
	// 		}
	// 	},
	// 	onError: (error, data, context) => {
	// 		queryClient.setQueryData(['events', id], context.previousEvent) // rollback in case of issue
	// 	},
	// 	onSettled: () => {
	// 		queryClient.invalidateQueries(['events', id])
	// 	}
	// })

	function handleSubmit(formData) {
		//  Using useMutation
		// mutate({ id, event: formData })
		// navigate("../")

		submit(formData, { method: "PUT" }) // using the action
	}

	function handleClose() {
		navigate("../")
	}

	let content

	if (isError) {
		content = (
			<>
				<ErrorBlock
					title={"error"}
					message={error.message}
				/>
				<div className='form-actions'>
					<Link
						to='../'
						className='button'>
						Okay
					</Link>
				</div>
			</>
		)
	}

	if (data) {
		content = (
			<EventForm
				inputData={data}
				onSubmit={handleSubmit}>
				{state === "submitting" ? (
					<p>Sending data</p>
				) : (
					<>
						<Link
							to='../'
							className='button-text'>
							Cancel
						</Link>
						<button
							type='submit'
							className='button'>
							Update
						</button>
					</>
				)}
			</EventForm>
		)
	}

	return <Modal onClose={handleClose}>{content}</Modal>
}

export const loader = ({ params }) => {
	const { id } = params

	return queryClient.fetchQuery({
		queryKey: ["events", id],
		queryFn: ({ signal }) => fetchEvent({ id, signal }),
	})
}

export const action = async ({ request, params }) => {
	const { id } = params

	const formData = await request.formData()
	const updatedEventData = Object.fromEntries(formData)

	await updateEvent({ id, event: updatedEventData })
	await queryClient.invalidateQueries({ queryKey: ["events"] })

	return redirect("../")
}
