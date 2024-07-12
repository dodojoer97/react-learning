// Interface
import { ILoginDTO } from "@/DTO/request/Login.d";

class LoginDTO implements ILoginDTO {
	email: string;
	password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export default LoginDTO;
