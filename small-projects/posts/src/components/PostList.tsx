import { FC, useState, useEffect, useCallback } from "react";

// Models
import { Post } from "@/models/Post";

// Component
import PostComponent from "./Post";
import Modal from "./Modal";
import Form from "./Form";

// Config
import modalDelay from "@/config/modalDelay";

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

	const handleCloseModal = useCallback((): void => {
		setIsEditModalOpen(false);
		setTimeout(() => {
			setEditPost(null);
		}, modalDelay);
	}, []);

	const handleEditClick = useCallback(
		(id: number): void => {
			const post: Post | undefined = findPostById(id);
			if (post) {
				setEditPost(post);
				setIsEditModalOpen(true);
			}
		},
		[findPostById]
	);

	const handleSave = useCallback(
		async (title: string, body: string): Promise<void> => {
			if (!editPost) return;

			try {
				const updatedPost = { ...editPost, title, body };
				await window.postsService.editPost(updatedPost); // Assuming updatePost is the API call

				setPosts((currentPosts) => currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));

				setIsEditModalOpen(false);
				setEditPost(null);
			} catch (error) {
				console.error("Failed to save post:", error);
			}
		},
		[editPost]
	);

	return (
		<>
			<Modal onClose={handleCloseModal} open={isEditModalOpen}>
				{editPost && <Form onCancel={handleCloseModal} onSave={handleSave} title={editPost.title} body={editPost.body} />}
			</Modal>
			<div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post: Post) => (
					<PostComponent key={post.id} post={post} onEditClick={handleEditClick} />
				))}
			</div>
		</>
	);
};

export default PostList;
