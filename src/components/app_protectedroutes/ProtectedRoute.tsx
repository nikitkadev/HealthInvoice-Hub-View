import { Navigate } from 'react-router';
import { LoaderBlock } from '../../shared/ui/loader/LoaderBlock';
import { useAuth } from '../app_auth/auth_service/AuthProvider';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        console.log("Пук в протектеде");
        return <LoaderBlock text="Велскейтим через траллей до базы данных..." />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }


    return <>{children}</>;
};