import type { RegisterUser } from '../../pages/Users/types';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../shared/api/ApiClient';

import Button from '../../ui/Button/Button';
import GorizontalSeparator from '../../ui/Seporators/GorizontalSeporator';
import DefaultLoader from '../../ui/Loaders/DefaultLoader';

import styles from './styles.module.scss';

interface RegisterUserFormProps {
    closeDrawer: () => void;
    refreshUsers: () => void;
};

const RegisterUserForm = ({
    closeDrawer,
    refreshUsers
}: RegisterUserFormProps) => {

    const [registerUser, setRegisterUser] = useState<RegisterUser>({
        username: '',
        password: '',
        organizationCode: '',
        surname: '',
        name: '',
        patronymic: '',
        phone: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const registeUser = async () => {

        setIsLoading(true);

        try {

            await api.postWithoutContent('/auth/registe', {
                username: registerUser.username,
                password: registerUser.password,
                organizationCode: registerUser.organizationCode,
                name: registerUser.name,
                surname: registerUser.surname,
                patronymic: registerUser.patronymic,
                phoneNumber: registerUser.phone
            });


            setRegisterUser({
                username: '',
                password: '',
                organizationCode: '',
                surname: '',
                name: '',
                patronymic: '',
                phone: ''
            });

            closeDrawer();
            refreshUsers();

            toast.success("Пользователь зарегистрирован!");

        }
        catch {
            toast.error("Ошибка при регистрации пользователя!");
        }
        finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <DefaultLoader />
    }

    return (
        <div className={styles.registerUserFormRoot}>
            <form
                onSubmit={registeUser}>

                <div className={styles.field}>
                    <label>Имя пользователя</label>
                    <input
                        placeholder='nikitkadev@gmail.com'
                        value={registerUser.username}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, username: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <div className={styles.field}>
                    <label>Пароль</label>
                    <input
                        type='password'
                        value={registerUser.password}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, password: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <div className={styles.field}>
                    <label>Код организации</label>
                    <input
                        placeholder='190001'
                        value={registerUser.organizationCode}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, organizationCode: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <GorizontalSeparator size='sm' type='line' />

                <div className={styles.field}>
                    <label>Фамилия</label>
                    <input
                        placeholder='Шефов'
                        value={registerUser.surname}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, surname: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <div className={styles.field}>
                    <label>Имя</label>
                    <input
                        placeholder='Александр'
                        value={registerUser.name}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, name: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <div className={styles.field}>
                    <label>Отчество</label>
                    <input
                        placeholder='Борисыч'
                        value={registerUser.patronymic}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, patronymic: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <div className={styles.field}>
                    <label>Контактный телефон</label>
                    <input
                        placeholder='8 (3902) 22-22-22'
                        value={registerUser.phone}
                        onChange={(e) => {
                            setRegisterUser(prev => ({
                                ...prev, phone: e.target.value
                            }))
                        }}
                        required={true}
                    />
                </div>

                <GorizontalSeparator size='sm' type='line' />

                <div className={styles.action}>
                    <Button
                        type='submit'>
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
                        Зарегестрировать в системе
                    </Button>
                </div>

            </form>
        </div>
    )
};

export default RegisterUserForm;