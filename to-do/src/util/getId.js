import { v4 as uuidv4 } from "uuid";

function getId() {
	return uuidv4();
}

export default getId;
