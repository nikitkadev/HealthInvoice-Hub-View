import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "./AuthService";
import type { LoginCredentials, UserInfo } from "./AuthDtos";

interface AuthContextType {
    user: UserInfo | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<UserInfo | null>;
    logout: () => Promise<void>;
    checkSession: () => void;
}
interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkSession()
    }, []);

    const checkSession = async () => {
        try {
            const userInfo = await authService.getCurrentUser();
            setUser(userInfo);
        }
        catch (error) {
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials): Promise<UserInfo | null> => {
        try {
            const user = await authService.login(credentials);
            setUser(user);
            return user;

        } catch (error) {
            return null;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            await checkSession();
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, login, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth ошибка');
    }
    return context;
};