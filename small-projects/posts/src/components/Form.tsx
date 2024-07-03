import { FC, useState } from "react"

// Types
import type { InputName, Props, IState } from "./Form.d"

// CSS
import "./Form.css"

// Components 
import Error from "./Error"


const Form: FC<Props> = ({ onSave, onCancel, title = "", body = "" }) => {
	// state
	const [values, setValues] = useState<IState>({
		title,
		body,
	})

	const [didEdit, setDidEdit] = useState<{title: boolean, body: boolean}>({
		title: false,
		body: false,
	});

	const errors = {
		title: !values.title,
		body: !values.body
	}

	// Computed
	const hasErrors: boolean = !!Object.values(errors).filter(Boolean).length
	const displayTitleError: boolean = errors.title && didEdit.title
	const displayBodyError: boolean = errors.body && didEdit.body


	// Handle input change
	const handleChange = (input: InputName, value: string): void => {
		setValues((currentValues: IState) => {
			return {
				...currentValues,
				[input]: value,
			}
		})
	}

	// Handle blur
	const handleInputBlur = (input: InputName): void => {
		setDidEdit((prevEdit) => {
			return {
				...prevEdit,
				[input]: true,
			};
		});
	}


	// Save the post
	const handleSave = (): void => {
		// Skip saving with errors
		if(hasErrors) return

		onSave(values.title, values.body)
	}




	return (
		<div className='container'>
			<form className='rounded px-8 pt-6 pb-8 mb-4'>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='title'>
						Title
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='title'
						type='text'
						placeholder='Title'
						value={values.title}
						onBlur={() => handleInputBlur("title")}
						onChange={(e) => handleChange("title", e.target.value)}
					/>
					{displayTitleError && <Error message="Test"/>}

				</div>
				<div className='mb-6'>
					<label
						htmlFor='body'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
						Body
					</label>
					<textarea
						id='body'
						className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='body'
						rows={10}
						value={values.body}
						onBlur={() => handleInputBlur("body")}
						onChange={(e) => handleChange("body", e.target.value)}></textarea>
						{displayBodyError && <Error message="Body must be something"/>}

				</div>
				<div className='flex justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='button'
						onClick={handleSave}>
						Save
					</button>
					<button
						className='bg-yellow-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='button'
						onClick={onCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}

export default Form
