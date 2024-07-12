// Base service interface
import { IBaseService } from "./BaseService.d";

// DTO
import SignupDTO from "../DTO/request/Signup";
import LoginDTO from "../DTO/request/Login";

interface IAuthService extends IBaseService {
	signup(dto: SignupDTO): void;
	login(dto: LoginDTO): void;
	logout(): void;
}
