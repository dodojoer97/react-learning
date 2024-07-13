// DTO
import SignupDTO from "../DTO/request/Signup";
import LoginDTO from "../DTO/request/Login";
import User from "@/models/User";

export interface IAuthService {
	signup(dto: SignupDTO): Promise<User | undefined>;
	login(dto: LoginDTO): Promise<User | undefined>;
	logout(): Promise<void>;
}
