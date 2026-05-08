import { Navigate } from "react-router";
import { LoaderBlock } from "../../shared/ui/loader/LoaderBlock";
import { useAuth } from "../app_auth/auth_service/AuthProvider";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoaderBlock text="Готовимся к дейвану Грани Спасения..." />;
    }

    if (user && user.isAcceptedPersonalData) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}