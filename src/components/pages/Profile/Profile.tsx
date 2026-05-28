import { useEffect } from 'react';
import { useAuth } from '../../app_auth/auth_service/AuthProvider';
import GorizontalSeporator from '../../ui/Seporators/GorizontalSeporator';
import styles from './styles.module.scss';

const Profile = () => {

    const { user } = useAuth();

    useEffect(() => {
        document.title = "HIH - Мой профиль";
    })

    return (
        <div className={styles.profileRoot}>
            <div className={styles.profileHeader}>
                <h2>Личный профиль</h2>
                <div className={styles.avatar}>{user?.name.substring(0, 1)}{user?.patronymic.substring(0, 1)}
                </div>
            </div>
            <GorizontalSeporator type='line' size='lg' color='var(--gray-200)' />
            <h3>Ваша личная информация</h3>
            <GorizontalSeporator type='space' size='xs' />
            <div className={styles.card}>
                <div className={styles.field}>
                    <label>Имя пользователя</label>
                    <p>{user?.username}</p>
                </div>
                <div className={styles.field}>
                    <label>Имя Отчество Фамилия</label>
                    <p>{user?.name} {user?.patronymic} {user?.surname}</p>
                </div>
                <div className={styles.field}>
                    <label>Код медицинской организации</label>
                    <p>{user?.organizationCode}</p>
                </div>
                <div className={styles.field}>
                    <label>Наименование медицинской организации</label>
                    <p>{user?.organizationName}</p>
                </div>
                <div className={styles.field}>
                    <label>Контактный телефон</label>
                    <p>{user?.phone}</p>
                </div>
                <div className={styles.field}>
                    <label>Начало сессии</label>
                    <p>{user?.sessionStart}</p>
                </div>
            </div>
            <GorizontalSeporator type='line' size='lg' color='var(--gray-200)' />
            <h3>Ваша статистика</h3>
            <GorizontalSeporator type='space' size='xs' />
            <div className={styles.card}>
                <label>Планирую подкрутить всякие циферки</label>
            </div>
        </div>
    )
}

export default Profile;