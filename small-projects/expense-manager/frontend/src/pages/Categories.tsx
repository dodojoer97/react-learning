// React
import type { FC } from "react";
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store"; // Import the store
import { toggleOpen } from "@/store/openSlice"; // Import toggle action from open slice

// Components
import CategoriesDropdown from "@/components/UI/CategoriesDropdown";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Categories: FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const categories = useSelector((state: RootState) => state.categories.categories);

	return (
		<>
			<div className="flex justify-end">
				<FontAwesomeIcon
					className="cursor-pointer w-10 h-10 text-blue-600"
					icon={faPlusCircle}
					onClick={() => dispatch(toggleOpen("categories"))} // Use dispatch to toggle open state
				/>
			</div>

			{categories.length > 0 && <CategoriesDropdown categories={categories} />}
		</>
	);
};

export default Categories;
