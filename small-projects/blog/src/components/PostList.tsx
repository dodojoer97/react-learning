import { FC, useState } from "react";

// Types
import { Post } from "@/types";

// Components
import PostComponent from "@/components/Post";
import AddPostForm from "@/components/AddPostForm";

// Data
import POSTS from "@/data/posts";

const PostList: FC = () => {
	const [posts, setPosts] = useState<Post[]>(POSTS);

	const handleAddPost = (post: Post): void => {
		setPosts((currentPosts) => {
			return [...currentPosts, post];
		});
	};

	return (
		<>
			<AddPostForm onAddPost={handleAddPost} />
			<div className="grid gap-4 grid-cols-3 grid-rows-3">
				{posts.map((post: Post) => (
					<PostComponent key={post.id} {...post} />
				))}
			</div>
		</>
	);
};

export default PostList;
