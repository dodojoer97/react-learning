import { FC, useState, useEffect, useCallback } from "react";

// Models
import { Post } from "@/models/Post";

// Component
import PostComponent from "./Post";
import Modal from "./Modal";

const PostList: FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [editPost, setEditPost] = useState<Post | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleGetPosts = async () => {
			const posts: Post[] = await window.postsService.getAllPosts();

			setPosts((currentPosts) => [...currentPosts, ...posts]);
		};

		handleGetPosts();
	}, []);

	const findPostById = useCallback(
		(id: number) => {
			const foundPost: Post | undefined = posts.find((post: Post) => post.id === id);
			if (!foundPost) console.error(`no post with id ${id} found in posts`);
			return foundPost;
		},
		[posts]
	);

	const handleEditClick = (id: number): void => {
		const post: Post | undefined = findPostById(id);
		if (post) {
			setEditPost(post);
			setIsEditModalOpen(true);
		}
	};

	const handleCloseModal = (): void => {
		setIsEditModalOpen(false);
		setEditPost(null);
	};

	return (
		<>
			{editPost && (
				<Modal onClose={handleCloseModal} open={isEditModalOpen}>
					{editPost.title}
				</Modal>
			)}
			<div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post: Post) => (
					<PostComponent key={post.id} post={post} onEditClick={handleEditClick} />
				))}
			</div>
		</>
	);
};

export default PostList;
