import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "./AuthService";
import type { LoginCredentials, LoginResult, UserInfo } from "./AuthDtos";

interface AuthContextType {
    user: UserInfo | null;
    isLoading: boolean;
    isAdmin: boolean;
    login: (credentials: LoginCredentials) => Promise<LoginResult | null>;
    logout: () => Promise<void>;
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
        setIsLoading(true);
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

    const login = async (credentials: LoginCredentials): Promise<LoginResult | null> => {

        try {
            setIsLoading(true);
            const loginResult = await authService.login(credentials);

            if (loginResult.isSuccess) {
                const currentUser = await authService.getCurrentUser();

                if (currentUser) {
                    setUser(currentUser);
                    return loginResult;
                }
            }

            return loginResult;

        } catch (error) {
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAdmin: user?.organizationCode === '19000',
            logout,
            login
        }}>
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