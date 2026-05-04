import { Separator } from "../../shared/ui/seporator/Separator";
import { LoaderBlock } from "../../shared/ui/loader/LoaderBlock";
import { useAuth } from "../app_auth/auth_service/AuthContext";
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {

    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <LoaderBlock size="small" text="Вычисляем импостера..." />
        )
    }

    return (
        <div className={styles.container}>
                <div className={styles.card_header}>
                    <h3 className={styles.h3}>Личный профиль</h3>
                    <div className={styles.avatar}>{user?.name.substring(0, 1)}{user?.patronymic.substring(0, 1)}
                    </div>
                </div>
                <Separator type="space" size="md" />
                <div className={styles.line_container}>
                    <div className={styles.info_container}>
                        <label className={styles.label}>Имя пользователя</label>
                        <p className={styles.p}>{user?.username ?? '-'}</p>
                    </div>
                    <div className={styles.info_container}>
                        <label className={styles.label}>ФИО</label>
                        <p className={styles.p}>{user?.surname} {user?.name} {user?.patronymic}</p>
                    </div>
                </div>
                <Separator type="space" size="xs" />
                <div className={styles.line_container}>
                    <div className={styles.info_container}>
                        <label className={styles.label}>Код организации</label>
                        <p className={styles.p}>{user?.organizationCode ?? '-'}</p>
                    </div>
                    <div className={styles.info_container}>
                        <label className={styles.label}>Название организации</label>
                        <p className={styles.p}>{user?.organizationName ?? '-'}</p>
                    </div>
                </div>
                <Separator type="space" size="xs" />
                <div className={styles.line_container}>
                    <div className={styles.info_container}>
                        <label className={styles.label}>Контактный номер</label>
                        <p className={styles.p}>{user?.phone ?? '-'}</p>
                    </div>
                </div>
        </div>
    )
}