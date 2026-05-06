import type { LoginCredentials, LoginResult, UserInfo } from "./AuthDtos";
import { api } from "../../../shared/api/ApiClient";

class AuthService {

    async login(credentials: LoginCredentials): Promise<LoginResult> {
        return await api.post<LoginResult>("/auth/login", credentials);
    }

    async logout() {
        await api.postWithoutContent("/auth/logout");
    }

    async getCurrentUser(): Promise<UserInfo | null> {
        return await api.get("/auth/me");
    }

}

export const authService = new AuthService();