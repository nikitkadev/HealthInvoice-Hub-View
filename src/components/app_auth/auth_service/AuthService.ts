import type { LoginCredentials, UserInfo } from "./AuthDtos";
import { api } from "../../../shared/api/ApiClient";

class AuthService {

    async login(credentials: LoginCredentials): Promise<UserInfo> {
        return await api.post<UserInfo>("/auth/login", credentials);
    }

    async logout() {
        await api.post("/auth/logout");
    }

    async getCurrentUser(): Promise<UserInfo | null> {
        return await api.get("/auth/me") ?? null;
    }

}

export const authService = new AuthService();