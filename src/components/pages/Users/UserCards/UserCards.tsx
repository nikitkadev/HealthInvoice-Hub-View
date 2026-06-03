import type { UserInfo } from '../../../app_auth/auth_service/AuthDtos';

import DefaultLoader from '../../../ui/Loaders/DefaultLoader';
import Button from '../../../ui/Button/Button';

import dayjs from 'dayjs';
import styles from './styles.module.scss';


interface userCardsProps {
    users: UserInfo[];
    isLoading: boolean;
    isActive: (lastActivity: Date | null) => boolean;
    removeUser: (userUid: number) => void;
}

const UserCards = ({
    users,
    isLoading,
    isActive,
    removeUser
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
                                variant='smallIcon'
                                onClick={() => removeUser(user.uid)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m16 16l-4-4m0 0L8 8m4 4l4-4m-4 4l-4 4" />
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