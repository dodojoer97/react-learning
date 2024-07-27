// React
import { FC } from "react";
import { useCallback } from "react";

// Models
import Category from "@/models/Category";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

// UI Components
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import InputError from "@/components/UI/InputError";

// Hooks
import useModal from "@/hooks/useModal";
import useInput from "@/hooks/useInput";

// Config
import categoryImages from "@/config/categoryImages";

interface ICategoryProps {
	category: Category;
}

const CategoryComp: FC<ICategoryProps> = ({ category }) => {
	// Hooks
	const { isModalOpen, toggleModal } = useModal();
	const nameField = useInput(category.name, (value) => true);

	// Closes the modal and resets the input values
	const handleCloseModal = (): void => {
		toggleModal();
		nameField.resetInputValue();
	};

	return (
		<>
			<article className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2">
				<div className="flex items-center">
					<FontAwesomeIcon icon={category.icon} className="text-blue-500 text-2xl mr-4" />
					<p className="text-lg font-semibold text-gray-800">{category.name}</p>
				</div>
				<Button onClick={toggleModal}>
					<FontAwesomeIcon icon={faPencil} />
				</Button>
			</article>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleCloseModal} isFullScreen>
					<Form className="mx-auto px-7 mb-0 mt-8 max-w-md space-y-4" key={category.id}>
						<Input
							id="name"
							label="name"
							className="w-12"
							value={nameField.value}
							onChange={nameField.handleInputChange}
							onBlur={nameField.handleInputBlur}
						/>
					</Form>
				</Modal>
			)}
		</>
	);
};

export default CategoryComp;
