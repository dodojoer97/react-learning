import { FC, useState } from "react";

// Types
import { Post } from "@/types";

const PostComponent: FC<Post> = (postProp) => {
	const [post, setPost] = useState<Post>(postProp);

	const handleUpdateLikes = (): void => {
		setPost((currentPost: Post) => {
			const updatedLikes = currentPost.numberOfLikes + 1;
			return {
				...currentPost,
				numberOfLikes: updatedLikes,
			};
		});
	};

	return (
		<>
			<div className="max-w-sm rounded overflow-hidden shadow-lg p-5 text-center">
				<h1>{post.title}</h1>
				<p className="text-gray-700 text-base">{post.description}</p>
				<p>likes {post.numberOfLikes}</p>
				<button onClick={handleUpdateLikes}>LIKE</button>
			</div>
		</>
	);
};

export default PostComponent;
