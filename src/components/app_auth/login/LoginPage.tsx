import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth_service/AuthContext';
import { Separator } from '../../../shared/ui/seporator/Separator';
import { LoaderBlock } from '../../../shared/ui/loader/LoaderBlock';

import styles from './LoginPage.module.css';

export const LoginPage = () => {

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

        try {
            const user = await login({ username, password });

            if (!user) {
                setIsWrongData(true);
                return;
            }

            if (!user.isAcceptedPersonalData) {
                navigate('/consent');
            } else {
                navigate('/');
            }
        } catch (error: any) {
            console.error("Login error:", error);
        }
        finally {
            setIsSubmitting(false);
        }
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
                <div className={`${styles.container}`}>
                    <h1>Вход в ваш аккаунт</h1>
                    <Separator size='xs' type='space' />
                    <p>Введите почту и пароль, выданные для вашей организации.</p>
                    {validateNotification.visible && (
                        <div className={styles.error_notification}
                            style={{
                            }}>{validateNotification.error}</div>
                    )}
                    <Separator size='xs' type='space' />
                    <form
                        onSubmit={handleSubmit}>
                        <div className={styles.inputs}>
                            <label htmlFor="username">Почта</label>
                            <input
                                className={`${isWrongData ? styles.wrong_data : ""}`}
                                id="username"
                                name="email"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setValidateNotification(prev => ({ ...prev, visible: false }));
                                    e.currentTarget.setCustomValidity("")

                                    // }}
                                    // onInvalid={(e) => {
                                    //     e.currentTarget.setCustomValidity("Вы чуть-чуть ввели не почту :)")
                                    //     e.preventDefault();
                                    //     handleValidationError(e, "email")
                                }}
                                required
                                placeholder="tfomsrx@gmail.com"
                            />
                        </div>
                        <div className={styles.inputs}>
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
                                    e.currentTarget.setCustomValidity("Вы чуть-чуть забыли про пароль :)")
                                    e.preventDefault();
                                    handleValidationError(e, "email")
                                }}
                                required
                            />
                        </div>
                        <Separator size="xs" type="space" />
                        <button type="submit">Войти</button>

                    </form>
                </div >
            ) : (
                <LoaderBlock text="Проверяем вашу личность в нашей системе..." size='small' />
            )}
        </>
    );
};