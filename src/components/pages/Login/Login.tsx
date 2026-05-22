import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../../app_auth/auth_service/AuthProvider';

import GorizontalSeporator from '../../ui/Seporators/GorizontalSeporator';
import Button from '../../ui/Button/Button';

import styles from './styles.module.scss';
import Loader from '../../ui/Loader';

const Login = () => {

    const [validateNotification, setValidateNotification] = useState<{
        visible: boolean,
        error: string;
    }>({
        visible: false,
        error: "",
    });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongData, setIsWrongData] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsWrongData(false);

        const loginResult = await login({ username, password });

        if (loginResult) {

            if (loginResult.isSuccess) {

                loginResult.isAcceptedPersonalPolicy ? navigate("/") : navigate("/consent");
                toast.success(loginResult.clientMessage ?? "Успешный вход!");

                return;
            }

            toast.error(loginResult.clientMessage ?? "Ошибка в логине или пароле!");
        }

        setIsSubmitting(false);
    };

    const handleValidationError = (e: React.InvalidEvent<HTMLInputElement>, fieldName: string) => {
        setValidateNotification({
            visible: true,
            error: e.currentTarget.validationMessage || `Неверный формат ${fieldName}`,
        });
    }

    return (
        <>
            {!isSubmitting ? (
                <div className={`${styles.loginRoot}`}>
                    <h1>Вход в ваш аккаунт</h1>
                    <GorizontalSeporator size='sm' type='space' />
                    <p>Введите почту и пароль, выданные для вашей организации.</p>
                    {validateNotification.visible && (
                        <>
                            <GorizontalSeporator size='xs' type='space' />
                            <div className={styles.errorNotification}>
                                <p>{validateNotification.error}</p>
                            </div>
                        </>
                    )}
                    <GorizontalSeporator size='sm' type='space' />
                    <form
                        onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="username">Почта</label>
                            <input
                                id="username"
                                name="email"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setValidateNotification(prev => ({ ...prev, visible: false }));
                                    e.currentTarget.setCustomValidity("")
                                }}
                                onInvalid={(e) => {
                                    e.currentTarget.setCustomValidity("Пожалуйста, укажите почту!")
                                    e.preventDefault();
                                    handleValidationError(e, "email")
                                }}
                                required
                                placeholder="nikitkadev@gmail.com"
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="password">Пароль</label>
                            <input
                                className={`${styles.input} ${isWrongData ? styles.wrong_data : ""}`}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setValidateNotification(prev => ({ ...prev, visible: false }));
                                    e.currentTarget.setCustomValidity("")
                                }}
                                onInvalid={(e) => {
                                    e.currentTarget.setCustomValidity("Пожалуйста. укажите пароль!")
                                    e.preventDefault();
                                    handleValidationError(e, "email")
                                }}
                                required
                            />
                        </div>
                        <GorizontalSeporator size="sm" type="line" color='var(--gray-100)' />
                        <Button type='submit' variant='primary' fullWidth={true}>Войти</Button>
                    </form>
                </div >
            ) : (
                <Loader size='xs' />
            )}
        </>
    );
};

export default Login;