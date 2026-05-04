import { Navigate } from 'react-router';
import { LoaderBlock } from '../../shared/ui/loader/LoaderBlock';
import { useAuth } from '../app_auth/auth_service/AuthContext';
import { NotAdminPage } from '../../shared/ui/error_pages/not_admin/NotAdminPage';

interface AdminOnlyRouteProps {
    children: React.ReactNode;
}

export const AdminOnlyRoute = ({ children }: AdminOnlyRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoaderBlock text="Проверяем ваш билд на Войд Штормера..." />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.organizationCode !== "19000") {
        return (
            <NotAdminPage />
        )
    }


    return <>{children}</>;
};