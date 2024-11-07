export class User {
	constructor(
		public uid: string,
		public email: string,
		public displayName: string,
		public currency: string,
		public password?: string
	) {}
}
