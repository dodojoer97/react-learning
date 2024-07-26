// Interface
import { ILoginDTO } from "@/DTO/response/Login.d";

class LoginDTO implements ILoginDTO {
	constructor(public token: string) {}
}

export default LoginDTO;
