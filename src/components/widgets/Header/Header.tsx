import { Link } from 'react-router';

import config from '../../../../package.json';
import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.headerRoot}>
            <Link
                to="/"
                className={styles.homePageLink}>
                <h1>HealthInvoice Hub v{config.version}</h1>
            </Link>
        </header>
    );
};

export default Header;