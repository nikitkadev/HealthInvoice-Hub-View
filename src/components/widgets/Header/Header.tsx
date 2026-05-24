import { Link } from 'react-router';
import { useAuth } from '../../app_auth/auth_service/AuthProvider';

import DropdownHeaderMenu from '../../ui/DropdownMenu/DropdownHeaderMenu';
import config from '../../../../package.json';
import styles from './styles.module.scss';

export const Header = () => {

    const { user, logout } = useAuth();
    const LoggedIn = !!user;

    const handleLogoutButtonClick = () => {
        logout();
    }

    return (
        <header className={styles.headerRoot}>
            <Link
                to="/"
                className={styles.homePageLink}>
                <h1>HealthInvoice Hub v{config.version}</h1>
            </Link>
            {true && (
                <DropdownHeaderMenu logout={handleLogoutButtonClick} />
            )}
        </header>
    );
};

export default Header;