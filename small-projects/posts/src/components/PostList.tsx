import { FC, useState, useEffect } from "react";

// Models
import { Post } from "@/models/Post";

// Component
import PostComponent from "./Post";

const PostList: FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const handleGetPosts = async () => {
			const posts: Post[] = await window.postsService.getAllPosts();

			setPosts((currentPosts) => [...currentPosts, ...posts]);
		};

		handleGetPosts();
	}, []);

	return (
		<div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{posts.map((post: Post) => (
				<PostComponent key={post.id} post={post} />
			))}
		</div>
	);
};

export default PostList;
