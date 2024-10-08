import { Form, useFetcher } from "react-router-dom"

import classes from "./NewsletterSignup.module.css"
import { useEffect } from "react"

function NewsletterSignup() {
	const fetcher = useFetcher() // use fercher should be used when we want to submit a form without navigating
	const { data, state } = fetcher

	useEffect(() => {
		if (state === "idle" && data && data.message) {
			window.alert(data.message)
		}
	}, [data, state])

	return (
		<fetcher.Form
			method='post'
			action='/newsletter'
			className={classes.newsletter}>
			<input
				type='email'
				placeholder='Sign up for newsletter...'
				aria-label='Sign up for newsletter'
			/>
			<button>Sign up</button>
		</fetcher.Form>
	)
}

export default NewsletterSignup
