import { IUser } from "./User.d";

class User implements IUser {
	id: string;
	email: string;
	constructor(id: string, email: string) {
		this.id = id;
		this.email = email;
	}
}

export default User;
