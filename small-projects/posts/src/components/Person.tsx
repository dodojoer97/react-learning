import { FC, PropsWithChildren } from "react";

// Import FontAwesomeIcon component and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Props extends PropsWithChildren {
	[key: string]: any;
}

const Person: FC<Props> = ({ ...props }) => {
	return (
		<span {...props}>
			<FontAwesomeIcon icon={faUser} />
		</span>
	);
};

export default Person;
