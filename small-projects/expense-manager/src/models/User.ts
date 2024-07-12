import { IUser } from "./User.d";

class User implements IUser {
	id: string;
	email: string;
	password: string;
	constructor(id: string, email: string, password: string) {
		this.id = id;
		this.email = email;
		this.password = password;
	}
}

export default User;
