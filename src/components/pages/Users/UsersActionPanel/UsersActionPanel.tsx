import { useState } from 'react';

import Button from '../../../ui/Button/Button';
import Drawer from '../../../ui/Drawer';
import RegisterUserForm from '../../../widgets/RegisterUserForm';
import styles from './styles.module.scss';

interface UsersActionPanelProps {
    refreshUsers: () => void;
}



const UsersActionPanel = ({
    refreshUsers
}: UsersActionPanelProps) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.usersActionPanelRoot}>
            <div className={styles.usersInfo}>
                <h1>Пользователи</h1>
            </div>
            <div className={styles.action}>

                <Button
                    variant='secondary'
                    fullWidth={false}
                    onClick={refreshUsers}>
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
                            stroke-width="1.5"
                            d="M14 16h5v5M10 8H5V3m14.418 6.003A8 8 0 0 0 5.086 7.976m-.504 7.021a8 8 0 0 0 14.331 1.027" />
                    </svg>
                    Обновить
                </Button>

                <Button
                    variant='primary'
                    fullWidth={false}
                    onClick={() => setIsOpen(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="var(--white)"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 12h6m0 0h6m-6 0v6m0-6V6" />
                    </svg>
                    Добавить пользователей
                </Button>
            </div>

            <Drawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title='Новый пользователь'
                type='registerUsers'
            >
                <RegisterUserForm
                    closeDrawer={() => setIsOpen(false)}
                    refreshUsers={refreshUsers} />
            </Drawer>
        </div>
    )
};

export default UsersActionPanel;