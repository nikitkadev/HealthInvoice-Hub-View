import { useEffect, useState } from 'react';
import { Separator } from '../../../shared/ui/seporator/Separator';
import { UserControlPanelPage } from './UserControlPanelPage';
import { api } from '../../../shared/api/ApiClient';
import { toast } from 'react-toastify';
import type { UserInfo } from '../../app_auth/auth_service/AuthDtos';
import { JsonDropped } from '../../../shared/ui/dropped/Json/JsonDropped';

import styles from './UserControlPage.module.css';
import dayjs from 'dayjs';
import Loader from '../../ui/Loaders/Loader';

export const UserControlPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [appUsers, setAppUsers] = useState<UserInfo[]>([]);

    const handlerRefreshUsers = async () => {

        setIsLoading(true);

        try {
            const appUsers = await api.get<UserInfo[]>("/admin/users/get");
            if (!appUsers) {
                toast.error("Не удалось получить пользователей приложения")
                return;
            }

            setAppUsers(appUsers);
        }
        catch (error) {
            toast.error("Ошибка при попытке получить пользователей приложения")
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleRemoveButton = async (user: UserInfo) => {
        setIsLoading(true);

        try {
            await api.postWithoutContent('/admin/users/remove', user.uid);
            toast.success("Пользователь успешно удален из приложения");

            handlerRefreshUsers();
        }
        catch (error) {
            toast.error("Ошибка при попытке удалить пользовтеля из базы данных");
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleBulkRegister = async (file: File) => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('usersData', file);

            await api.postFormData('/auth/bulk-register', formData);
            toast.success("Пользователи успешно добавлены!");
        }
        catch (error) {
            toast.error("Произошла ошибка при попытке добавить пользователей!");
        }
        finally {
            setIsLoading(false);
        }
    }
    const isActive = (lastActivity: Date | null): boolean => {
        if (!lastActivity) return false;

        const last = dayjs(lastActivity);
        const now = dayjs();

        const diffMinutes = now.diff(last, 'minutes');
        return diffMinutes < 5;
    }

    useEffect(() => {
        handlerRefreshUsers();
    }, []);

    return (
        <>
            <UserControlPanelPage
                onUserRefresh={handlerRefreshUsers}
                usersOnline={appUsers.filter(f => isActive(f.lastActivity)).length}
                usersTotal={appUsers.length} />
            <JsonDropped onFileDropped={handleBulkRegister} isLoading={isLoading} />
            {isLoading ? (
                <Loader size='xs' />
            ) : (
                <div className={styles.container}>
                    <div className={styles.cardsGrid}>
                        {appUsers.map((item, index) => {
                            const isAtivityUser = isActive(item.lastActivity);
                            return (
                                <div key={index + 1} className={`${styles.card}  ${isAtivityUser ? styles.active_user_card : ''}`}>
                                    <div className={styles.card_header}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }}>
                                                <h1 className={styles.h1}>{item.surname} {item.name} {item.patronymic}</h1>

                                            </div>
                                        </div>
                                        <div className={styles.avatar}>
                                            {item.name.substring(0, 1)}{item.patronymic.substring(0, 1)}
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <h2 className={styles.h2}>{item.organizationCode === '19000' ? 'Администратор' : 'Пользователь'}</h2>
                                            <div className={isAtivityUser ? styles.status_active_block : styles.status_inactive_block}>
                                                <p className={isAtivityUser ? styles.status_active_text : styles.status_inactive_text}>{isAtivityUser ? 'В сети' : 'Не в сети'}</p>
                                            </div>
                                        </div>


                                    </div>
                                    <Separator type='space' size='md' />
                                    <div className={styles.cards_line} style={{ gap: '3rem' }}>
                                        <div className={styles.info_block}>
                                            <label className={styles.card_label}>Имя пользователя</label>
                                            <p className={styles.card_p}>{item.username}</p>
                                        </div>
                                        <div className={styles.info_block}>
                                            <label className={styles.card_label}>Организация</label>
                                            <p className={styles.card_p}>{item.organizationName}</p>
                                        </div>

                                    </div>
                                    <Separator type='space' size='xs' />
                                    <div className={styles.cards_line} style={{ gap: '3rem' }}>
                                        <div className={styles.info_block}>
                                            <label className={styles.card_label}>Телефон</label>
                                            <p className={styles.card_p}>{item.phone}</p>
                                        </div>
                                        <div className={styles.info_block}>
                                            <label className={styles.card_label}>Код организации</label>
                                            <p className={styles.card_p}>{item.organizationCode}</p>
                                        </div>
                                    </div>
                                    <Separator type='space' size='sm' />
                                    <div className={styles.button_container}>
                                        <button className={styles.button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" stroke-width="1.5">
                                                    <path d="m11.354 9.318l1.414-1.414a2 2 0 1 1 2.828 2.828l-1.414 1.414m-2.828-2.828l-3.387 3.386a4 4 0 0 0-1.094 2.044l-.175.877a1 1 0 0 0 1.177 1.177l.877-.175a4 4 0 0 0 2.044-1.094l3.386-3.387m-2.828-2.828l2.828 2.828" />
                                                    <path stroke-linecap="round" d="M15 17h4" />
                                                </g>
                                            </svg>
                                        </button>
                                        <button className={styles.button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 8l-4 4l4 4m6-8l4 4l-4 4" />
                                            </svg>
                                        </button>
                                        <button className={styles.button} onClick={() => handleRemoveButton(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>

    )
}