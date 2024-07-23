// Interface
import { ISignupDTO } from "@/DTO/request/Signup.d";

class SignupDTO implements ISignupDTO {
	email: string;
	password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export default SignupDTO;
