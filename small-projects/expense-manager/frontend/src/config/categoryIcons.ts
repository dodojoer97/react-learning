import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
	faBowlFood,
	faHouse,
	faBus,
	faPlug,
	faBeer,
	faMugHot,
	faCoins,
} from "@fortawesome/free-solid-svg-icons";

const categoryIcons: { [key: string]: IconDefinition } = {
	faBowlFood, // food
	faHouse, // house
	faBus, // public transport
	faPlug, // bills
	faBeer, // bar
	faMugHot, // coffee
	faCoins,
};

const categoryIconNames: { [key: string]: string } = {
	food: "faBowlFood",
	house: "faHouse",
	publicTransport: "faBus",
	bills: "faPlug",
	bar: "faBeer",
	coffee: "faMugHot",
	income: "faCoins",
};

export { categoryIcons, categoryIconNames };
