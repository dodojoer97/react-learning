import { FC, useState } from "react";

// Types
import { Post } from "@/types";

// Components
import EditModal from "@/components/EditModal";

const PostComponent: FC<Post> = (postProp) => {
	const [post, setPost] = useState<Post>(postProp);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleUpdateLikes = (): void => {
		setPost((currentPost: Post) => {
			const updatedLikes = currentPost.numberOfLikes + 1;
			return {
				...currentPost,
				numberOfLikes: updatedLikes,
			};
		});
	};

	const handleOpenModal = (): void => {
		setIsModalOpen(true);
	};

	return (
		<>
			<EditModal open={isModalOpen} post={postProp} />
			<div className="max-w-sm rounded overflow-hidden shadow-lg p-5 text-center">
				<div className="flex justify-end">
					<i className="fa-solid fa-pencil cursor-pointer" onClick={handleOpenModal}></i>
				</div>
				<h1>{post.title}</h1>
				<p className="text-gray-700 text-base">{post.description}</p>
				<p>likes {post.numberOfLikes}</p>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateLikes}>
					<i className="fa-solid fa-thumbs-up"></i>
				</button>
			</div>
		</>
	);
};

export default PostComponent;
