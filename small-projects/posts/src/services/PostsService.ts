// Models
import { Post } from "@/models/Post";

// DTO
import { CreatePostDTO, PostDTO } from "@/dto/PostDTO";

// BaseClass
import { BaseService } from "./BaseService";

// Logger
import { Logger } from "@/classes/Logger";

const logger = new Logger("PostService");

/**
 * Interface for posts service.
 * Defines the standard operations to be performed on Post objects.
 */
export interface IPostsService {
	getAllPosts(): Promise<Post[]>;
	getPost(id: string): Promise<Post>;
	createPost(postData: CreatePostDTO): Promise<Post>;
}

/**
 * Extends the BaseService to implement specific functionalities for posts.
 */
export class PostService extends BaseService implements IPostsService {
	/**
	 * Constructs a new instance of PostService.
	 * @param baseUrl The base URL for the post service endpoints.
	 */
	constructor() {
		super(import.meta.env.POSTS_API_URL); // Pass the base URL to the base class constructor
	}

	/**
	 * Retrieves all posts.
	 * @returns A promise that resolves with an array of Post objects.
	 */
	async getAllPosts(): Promise<Post[]> {
		try {
			const response: Response = await fetch(`${this.baseUrl}/posts`, {
				headers: this.getDefaultHeaders(),
			});

			if (!response.ok) {
				throw new Error(`Error getting all posts`);
			}
			const data: PostDTO[] = await response.json();

			const posts: Post[] = data.map((post: PostDTO) => this.mapPostDTOToPostModel(post));

			return posts;
		} catch (err: unknown) {
			if (err instanceof Error) {
				logger.error(err.message);
			} else {
				logger.error("Error in getAllPosts");
			}

			throw new Error("Error in getAllPosts check logs");
		}
	}

	/**
	 * Retrieves a single post by its ID.
	 * @param id The unique identifier of the post.
	 * @returns A promise that resolves with the Post object.
	 */
	async getPost(id: string): Promise<Post> {
		try {
			const response: Response = await fetch(`${this.baseUrl}/posts/${id}`, {
				headers: this.getDefaultHeaders(),
			});

			if (!response.ok) {
				throw new Error(`Error getting post with id ${id}`);
			}

			const data: PostDTO = await response.json();

			const post: Post = this.mapPostDTOToPostModel(data);

			return post;
		} catch (err) {
			if (err instanceof Error) {
				logger.error(err.message);
			} else {
				logger.error("Error in getPost");
			}

			throw new Error("Error in getPost");
		}
	}

	/**
	 * Creates a new post based on the provided post data.
	 * @param postData Data for creating a new post.
	 * @returns A promise that resolves with the newly created Post object.
	 */
	async createPost(postData: CreatePostDTO): Promise<Post> {
		try {
			const response = await fetch(`${this.baseUrl}/posts`, {
				method: "POST",
				headers: this.getDefaultHeaders(),
				body: JSON.stringify(postData),
			});

			if (!response.ok) {
				throw new Error(`Error creating a post`);
			}

			const data: PostDTO = await response.json();

			const post: Post = this.mapPostDTOToPostModel(data);
			return post;
		} catch (err) {
			if (err instanceof Error) {
				logger.error(err.message);
			} else {
				logger.error("Error in createPost");
			}

			throw new Error("Error in createPost");
		}
	}

	/**
	 *
	 * @param postDTO
	 * @returns a mapped post object
	 */
	private mapPostDTOToPostModel(postDTO: PostDTO): Post {
		try {
			this.validatePostDTO(postDTO);
			return new Post(postDTO.id, postDTO.title, postDTO.body, postDTO.userId);
		} catch (err: unknown) {
			if (err instanceof Error) {
				logger.error(err.message);
			} else {
				logger.error("Error in mapPostDTOToPostModel");
			}

			throw new Error("Error in mapPostDTOToPostModel");
		}
	}

	/**
	 *
	 * @param postDTO
	 * Validates post structure
	 */
	private validatePostDTO(postDTO: PostDTO): void {
		if (!postDTO.title) throw new Error("A post must have a title");
	}
}
