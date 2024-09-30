import { useRouteError } from "react-router-dom"

import PageContent from "../components/PageContent"

function ErrorPage() {
	const error = useRouteError()

	let title = "An error occured!"
	let message = "something went wrong"

	if (error.status === 500) {
		message = JSON.parse(error).data.message
	}

	if (error.status === 404) {
		title = "404"
		message = "Cold not find"
	}

	return (
		<PageContent title={title}>
			<p>{message}</p>
		</PageContent>
	)
}

export default ErrorPage
