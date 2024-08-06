// React
import { FC, useEffect } from "react";
import { useCallback } from "react";

// Models
import Category from "@/models/Category";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, IconDefinition } from "@fortawesome/free-solid-svg-icons";

// UI Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import InputError from "@/components/UI/InputError";
import SlidingPanel from "@/components/UI/SlidingPanel";

// Hooks
import useIsOpen from "@/hooks/useIsOpen";
import useInput from "@/hooks/useInput";
import useFormSubmission from "@/hooks/useFormSubmission";

// Util
import { hasMinLength } from "@/utils/utils";

interface ICategoryProps {
	category: Category;
}

const CategoryComp: FC<ICategoryProps> = ({ category }) => {
	// Hooks
	const { isOpen, toggleOpen } = useIsOpen(true);
	const nameField = useInput(category.name, (value) => {
		return hasMinLength(value, 4);
	});

	// TODO ADD TRANSLATIONS
	// Closes the modal and resets the input values
	const handleCloseModal = (): void => {
		toggleOpen();
		nameField.resetInputValue();
	};

	useEffect(() => {
		nameField.resetInputValue();
	}, [isOpen]); // Re-run effect if defaultValue changes

	const { handleSubmit, error } = useFormSubmission(async () => {});

	return (
		<>
			<article className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2">
				<div className="flex items-center">
					<FontAwesomeIcon
						icon={category.icon as IconDefinition}
						className="text-blue-500 text-2xl mr-4"
					/>
					<p className="text-lg font-semibold text-gray-800">{category.name}</p>
				</div>
				<Button onClick={toggleOpen}>
					<FontAwesomeIcon icon={faPencil} />
				</Button>
			</article>

			<SlidingPanel isOpen={isOpen} onClose={toggleOpen}>
				<Form
					className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4 flex flex-col justify-between h-[90%]"
					key={category.id}
					onSubmit={handleSubmit}
				>
					<div>
						<Input
							id="name"
							label="name"
							className="w-12"
							value={nameField.value}
							onChange={nameField.handleInputChange}
							onBlur={nameField.handleInputBlur}
						/>
						{nameField.hasError && (
							<InputError message={"some error of length"} className="text-red-600" />
						)}
					</div>

					{error && <InputError message={error} className="text-red-600" />}

					<Button
						type="submit"
						disabled={nameField.hasError}
						className="inline-block rounded-lg w-full bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-slate-400"
					>
						SAVE
					</Button>
				</Form>
			</SlidingPanel>
		</>
	);
};

export default CategoryComp;
