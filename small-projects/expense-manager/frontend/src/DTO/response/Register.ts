// Interface
import { IRegisterDTO } from "@/DTO/response/Register.d";

class RegisterDTO implements IRegisterDTO {
	constructor(public token: string) {}
}

export default RegisterDTO;
