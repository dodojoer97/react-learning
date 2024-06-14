// Type
import { Product } from "@/types";

// Assests
import StoolImage from "@/assets/stool.jpg";
import CameraImage from "@/assets/camera.jpg";
import WatchImage from "@/assets/watch.jpg";
import HeadphonesImage from "@/assets/headphones.jpg";
import SunglassesImage from "@/assets/sunglasses.jpg";

const products: Product[] = [
	{
		id: "asdda",
		title: "stool",
		description: "Great!!",
		price: 123,
		image: StoolImage,
	},
	{
		id: "someId",
		title: "camera",
		description: "Great!! woo",
		price: 1223,
		image: CameraImage,
	},
	{
		id: "watch",
		title: "watch",
		description: "Great!! watch",
		price: 12322,
		image: WatchImage,
	},
	{
		id: "headddd",
		title: "head phones",
		description: "Great!! headset",
		price: 12345,
		image: HeadphonesImage,
	},
	{
		id: "Sunglasses",
		title: "Sunglasses",
		description: "Great!! sunglasses",
		price: 120,
		image: SunglassesImage,
	},
];

export default products;
