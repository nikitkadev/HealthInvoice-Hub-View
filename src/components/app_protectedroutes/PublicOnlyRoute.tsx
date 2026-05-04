import { Navigate } from "react-router";
import { LoaderBlock } from "../../shared/ui/loader/LoaderBlock";
import { useAuth } from "../app_auth/auth_service/AuthContext";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
    
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <LoaderBlock text="Пробиваемся к серверу через дрегов..." size="small" />
        )
    }

    if (user && user.isAcceptedPersonalData) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}