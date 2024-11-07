import { User as UserModel } from "@common";

type User = Omit<UserModel, "password">;

export default User;
