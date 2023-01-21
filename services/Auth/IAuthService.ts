import { RegisterInput } from "~/types/register.types";
import { UpdateUser } from "~/types/updateUser.dto";

export interface IAuthService {
    registerUser(input: RegisterInput): Promise<any>
    updateUser(input: UpdateUser): Promise<any>
    getProfileUser(username: string): Promise<any>
    followUser(username:string):Promise<any>
    unFollowUser(username:string):Promise<any>
}