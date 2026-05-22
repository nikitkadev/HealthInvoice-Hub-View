import { Navigate } from 'react-router';
import { useAuth } from '../app_auth/auth_service/AuthProvider';
import Loader from '../ui/Loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loader size='xs' />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }


    return <>{children}</>;
};