import { FC, PropsWithChildren, ComponentProps } from "react";

// Import FontAwesomeIcon component and icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface Props extends PropsWithChildren {
	[key: string]: any;
}

const Pencil: FC<Props> = ({ ...props }) => {
	return (
		<span {...props}>
			<FontAwesomeIcon icon={faPen} />
		</span>
	);
};

export default Pencil;
