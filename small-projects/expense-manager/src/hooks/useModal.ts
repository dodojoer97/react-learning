import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"

const useModal = (): {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
} => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return {
		isModalOpen,
		setIsModalOpen,
	}
}

export default useModal