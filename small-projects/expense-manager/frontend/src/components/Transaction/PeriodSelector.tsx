// React
import type { FC } from "react";
import { useContext } from "react";

// Components
import Button from "@/components/UI/Button";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// Store
import { TransactionContext } from "@/store/TransactionContext";

const PeriodSelector: FC = () => {
	// Store
	const transactionCTX = useContext(TransactionContext);

	return (
		<div className="flex justify-between p-2 bg-white mt-5">
			<Button className="left-arrow">
				<FontAwesomeIcon icon={faChevronLeft} />
			</Button>
			<div className=""></div>
			<Button className="right-arrow">
				<FontAwesomeIcon icon={faChevronRight} />
			</Button>
		</div>
	);
};

export default PeriodSelector;
