import { IUser } from "./User.d";

class User implements IUser {
	uid: string;
	email: string;
	displayName: string;
	constructor(uid: string, email: string, displayName: string) {
		this.uid = uid;
		this.email = email;
		this.displayName = displayName;
	}
}

export default User;
