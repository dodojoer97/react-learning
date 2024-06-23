export interface IPost {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export class Post implements IPost {
	public id: number;
	public title: string;
	public body: string;
	public userId: number;

	constructor(id: number, title: string, body: string, userId: number) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.userId = userId;
	}
}
