export interface CreatePostDTO {
	title: string;
	body: string;
	userId: number;
}

export interface PostDTO {
	id: number;
	title: string;
	body: string;
	userId: number;
}
