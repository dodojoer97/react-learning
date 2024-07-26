// Interface
import { IRegisterDTO } from "@/DTO/request/Register.d";

class RegisterDTO implements IRegisterDTO {
	email: string;
	password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export default RegisterDTO;
