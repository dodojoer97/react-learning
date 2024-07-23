// React
import type {FC} from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// UI components
import Button from "./Button";

interface ICloseButtonProps {
    onClose(): void
}

const CloseButton: FC<ICloseButtonProps> = ({onClose}) => {
    return (
        <Button className="bg-gray-200 rounded-full text-black shadow-lg h-8 w-8" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
        </Button>
    );
}

export default CloseButton;
