import { FC } from "react"

// Types
import { Props } from "./Error.d"


const Error: FC<Props> = ({ message }) => {
	return (
		<div
			className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
			role='alert'>
			{/* <strong className='font-bold'>Holy smokes!</strong> */}
			<span className='block sm:inline'>{message}</span>
		</div>
	)
}

export default Error