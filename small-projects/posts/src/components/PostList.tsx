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
	const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		setIsModalOpen(false);
		setTimeout(() => {
			setEditPost(null);
		}, modalDelay);
	}, []);

	const handleEditClick = useCallback(
		(id: number): void => {
			const post: Post | undefined = findPostById(id);
			if (post) {
				setEditPost(post);
				setIsModalOpen(true);
			}
		},
		[findPostById]
	);

	const handleSave = useCallback(
		async (title: string, body: string, mode: "edit" | "create"): Promise<void> => {

			if(mode === "edit") {
				if (!editPost) return;
	
				try {
					setIsLoading(true);
					const updatedPost = { ...editPost, title, body };
					await window.postsService.editPost(updatedPost); // Assuming updatePost is the API call
	
					setPosts((currentPosts) => currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
	
					setIsModalOpen(false);
					setTimeout(() => {
						setEditPost(null);
						setIsLoading(false);
					}, modalDelay);
				} catch (error) {
					console.error("Failed to save post:", error);
				}

			}else if(mode === 'create') {
				setIsModalOpen(false);
				setTimeout(() => {
					setIsCreatingPost(false);
					setIsLoading(false);
				}, modalDelay);
			}
		},
		[editPost, isLoading]
	);

	const openCreateModal = (): void => {
		setIsModalOpen(true)
		setIsCreatingPost(true)
	}

	

	return (
		<>
			<button onClick={openCreateModal}>TEST</button>
			{isCreatingPost && "YEAG"}
			<Modal onClose={handleCloseModal} isOpen={isModalOpen} isLoading={isLoading}>
				{isCreatingPost && <Form onCancel={handleCloseModal} onSave={(title, body) => handleSave(title, body, 'create')} title={''} body={''} />}
				{/* {editPost && <Form onCancel={handleCloseModal} onSave={(title, body) => handleSave(title, body, 'edit')} title={editPost.title} body={editPost.body} />} */}
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
