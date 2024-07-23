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

// Hooks
import useModal from "@/hooks/useModal";

interface ICategoryProps {
	category: Category;
}

const CategoryComp: FC<ICategoryProps> = ({ category }) => {
	const { isModalOpen, toggleModal } = useModal();

	const handleToggleModal = useCallback(toggleModal, [toggleModal]);

	return (
		<>
			<article className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors my-2">
				<div className="flex items-center">
					<FontAwesomeIcon icon={category.icon} className="text-blue-500 text-2xl mr-4" />
					<p className="text-lg font-semibold text-gray-800">{category.name}</p>
				</div>
				<Button onClick={handleToggleModal}>
					<FontAwesomeIcon icon={faPencil} />
				</Button>
			</article>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleToggleModal}>
					<p>test</p>
				</Modal>
			)}
		</>
	);
};

export default CategoryComp;
