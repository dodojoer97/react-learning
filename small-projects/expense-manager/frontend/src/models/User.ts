import { IUser } from "./User.d";

class User implements IUser {
	uid: string;
	email: string;
	constructor(uid: string, email: string) {
		this.uid = uid;
		this.email = email;
	}
}

export default User;
