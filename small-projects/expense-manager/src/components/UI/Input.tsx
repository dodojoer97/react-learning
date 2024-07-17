import type { FC } from "react"

// Props
import { InputProps } from "./Input.d"

const Input: FC<InputProps> = ({
	type,
	label,
	id,
	hiddenLabel,
	inputIcon,
	clickableIcon,
	onClickIcon,
	...props
}) => {
	return (
		<>
			<div>
				<label
					htmlFor={id}
					className={hiddenLabel ? "absolute" : undefined}>
					{label}
				</label>

				<div className='relative'>
					<input
						type={type}
						id={id}
						name={id}
						{...props}
						className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus-visible:outline-black'
					/>
					{inputIcon && (
						<span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
							<img
								onClick={() => onClickIcon?.()}
								src={inputIcon}
								alt='Icon'
								className={`size-4 text-gray-400, ${
									clickableIcon ? "cursor-pointer" : ""
								}`}
							/>
						</span>
					)}
				</div>
			</div>
		</>
	)
}

export default Input
