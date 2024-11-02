// Interface
import { IRegisterDTO } from "@/DTO/request/Register.d";

class RegisterDTO implements IRegisterDTO {
	constructor(public email: string, public password: string, public displayName: string) {}
}

export default RegisterDTO;
