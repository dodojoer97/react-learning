import { FC, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// Types
import { Post } from "@/types";

interface Props {
	onAddPost(post: Post): void;
}

const AddPostForm: FC<Props> = ({ onAddPost }) => {
	const title = useRef<HTMLInputElement | null>(null);
	const description = useRef<HTMLInputElement | null>(null);

	const handleAddPost = (): void => {
		if (!title.current || !description.current) {
			console.error("Title and description refs are mandatory");
			return;
		}

		const titleValue = title.current.value;
		const descriptionValue = description.current.value;

		const post: Post = {
			id: uuidv4(),
			title: titleValue,
			description: descriptionValue,
			numberOfLikes: 0,
		};
		onAddPost(post);

		resetForm();
	};

	const resetForm = () => {
		if (!title.current || !description.current) {
			console.error("Title and description refs are mandatory");
			return;
		}

		title.current.value = "";
		description.current.value = "";
	};

	return (
		<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
					title
				</label>
				<input ref={title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
					description
				</label>
				<input ref={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="description" />
			</div>
			<button type="button" onClick={handleAddPost}>
				Add
			</button>
			{/* TODO add image upload */}
		</form>
	);
};

export default AddPostForm;
