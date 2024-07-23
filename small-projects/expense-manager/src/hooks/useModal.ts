import { useState } from "react"

const useModal = (): {
	isModalOpen: boolean
	toggleModal(): void
} => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const toggleModal = (): void => {
		setIsModalOpen(prev => !prev);
	};
	return {
		isModalOpen,
		toggleModal,
	}
}

export default useModal