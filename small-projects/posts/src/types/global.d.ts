// Services
import type { PostService } from "@/services/PostsService";

declare global {
	interface Window {
		postsService: PostService;
	}
}

export {};
