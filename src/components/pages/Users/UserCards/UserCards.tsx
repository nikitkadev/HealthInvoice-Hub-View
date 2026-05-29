import DefaultLoader from '../../../ui/Loaders/DefaultLoader';

import styles from './styles.module.scss';
import type { UserInfo } from '../../../app_auth/auth_service/AuthDtos';
import Button from '../../../ui/Button/Button';
import dayjs from 'dayjs';


interface userCardsProps {
    users: UserInfo[];
    isLoading: boolean;
    isActive: (lastActivity: Date | null) => boolean;
}

const UserCards = ({
    users,
    isLoading,
    isActive
}: userCardsProps) => {

    if (isLoading) {
        return (
            <DefaultLoader />
        )
    }

    return (
        <div className={styles.userCardsRoot}>
            {users.map((user) => (
                <div className={styles.card}>
                    <div className={styles.general}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {user.name.substring(0, 1)}{user.patronymic.substring(0, 1)}
                            </div>
                            <div className={styles.info}>
                                <h2>{user.surname} {user.name} {user.patronymic}</h2>
                                <span>{user.username}</span>
                                <span>{user.organizationCode}</span>
                                <span>{user.phone}</span>
                            </div>
                        </div>
                        <div className={styles.action}>
                            <Button
                                fullWidth={false}
                                variant='icon'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 18a1 1 0 1 0 2 0a1 1 0 0 0-2 0m0-6a1 1 0 1 0 2 0a1 1 0 0 0-2 0m0-6a1 1 0 1 0 2 0a1 1 0 0 0-2 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className={`${styles.activity}`}>
                        <div className={`${styles.status}  ${isActive(user.lastActivity) ? styles.activeStatus : styles.nonActiveStatus}`}>
                            {isActive(user.lastActivity) ? 'Активен' : 'Неактивен'}
                        </div>
                        <span className={styles.lastActivitySpan}>{dayjs(user.lastActivity).format('HH:mm:ss DD.MM.YYYY')}</span>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default UserCards;