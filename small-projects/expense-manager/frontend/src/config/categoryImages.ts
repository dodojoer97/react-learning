import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
	faBowlFood,
	faHouse,
	faBus,
	faPlug,
	faBeer,
	faMugHot,
} from "@fortawesome/free-solid-svg-icons";

// Category name to image mapping
const categoryImages: { [key: string]: IconDefinition } = {
	faBowlFood, // food
	faHouse, // house
	faBus, // public transport
	faPlug, // bills
	faBeer, // bar
	faMugHot, // coffee
};

export default categoryImages;
