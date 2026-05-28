import { Navigate } from "react-router";
import { useAuth } from "../app_auth/auth_service/AuthProvider";
import Loader from "../ui/Loaders/Loader";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loader size="xs" />;
    }

    if (user && user.isAcceptedPersonalData) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}