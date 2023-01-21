import { RegisterInput } from "~/types/register.types";
import { $axios } from "~/utils/api";
import { IAuthService } from "./IAuthService";
import { injectable } from "inversify";
import { UpdateUser } from "~/types/updateUser.dto";

@injectable()
export class AuthService implements IAuthService {
    registerUser(input: RegisterInput): Promise<any> {
        try {
            const res = $axios.$post('/site_api_url/users', {
                user: input
            });
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async updateUser(input: UpdateUser) {
        try {
            const res = await $axios.$put('/site_api_url/user', {
                user: {
                    ...input
                }
            });
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getProfileUser(username: string): Promise<any> {
        try {
            const encode_url = encodeURI(`/site_api_url/profiles/${username}`)
            const res = await $axios.$get(encode_url);
            return Promise.resolve(res.profile);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async followUser(username: string) {
        try {
            const encode_url = encodeURI(`/site_api_url/profiles/${username}/follow`)
            const res = await $axios.$post(encode_url);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async unFollowUser(username: string) {
        try {
            const encode_url = encodeURI(`/site_api_url/profiles/${username}/follow`)
            const res = await $axios.$delete(encode_url);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}