import { Navigate } from "react-router";
import { LoaderBlock } from "../../shared/ui/loader/LoaderBlock";
import { useAuth } from "../app_auth/auth_service/AuthProvider";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

export const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        console.log("PublicOnlyRoute: isLoading, показываем Loader");
        return <LoaderBlock text="..." />;
    }

    if (user && user.isAcceptedPersonalData) {
        console.log("PublicOnlyRoute: редирект на /");
        return <Navigate to="/" replace />;
    }

    console.log("PublicOnlyRoute: показываем детей");
    return <>{children}</>;
}