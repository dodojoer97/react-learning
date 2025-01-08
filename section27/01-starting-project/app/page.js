import fs from "node:fs/promises"

import ClientDemo from "@/components/ClientDemo"
import RSCDemo from "@/components/RSCDemo"

import DataFetchingDemo from "@/components/DataFetchingDemo"
import ServerActionsDemo from "@/components/ServerActionsDemo"
import UsePromiseDemo from "@/components/UsePromisesDemo"
import ErrorBoundary from "@/components/ErrorBoundary"

import { Suspense } from "react"

export default async function Home() {
	const fetchUsersPromise = new Promise((resolve, reject) =>
		setTimeout(async () => {
			const data = await fs.readFile("dummy-db.json", "utf-8")
			const users = JSON.parse(data)
			// resolve(users)
			reject(new Error("error"))
		}, 2000)
	)

	return (
		<main>
			<ErrorBoundary fallback='Went wrong'>
				<Suspense fallback={"...loading"}>
					<UsePromiseDemo usersPromise={fetchUsersPromise} />
				</Suspense>
			</ErrorBoundary>
		</main>
	)
}
