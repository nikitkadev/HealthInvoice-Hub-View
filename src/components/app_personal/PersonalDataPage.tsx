import { useNavigate } from 'react-router';
import { api } from '../../shared/api/ApiClient';
import { Separator } from '../../shared/ui/seporator/Separator';
import { useAuth } from '../app_auth/auth_service/AuthProvider';
import styles from './PersonalDataPage.module.css';
import { toast } from 'react-toastify';

export const PersonalDataPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAccept = async () => {
        try {
            await api.post('/auth/accept_pers');
            navigate('/');
            toast.success("Добро пожаловать!");
        }
        catch (error) {
            toast.error("Произошла ошибка при попытке принять соглашение...");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.text_container}>
                <p className={styles.p}>
                    Я, <b>{user?.surname} {user?.name} {user?.patronymic}</b>, в соответствии с п.1 ст. 9 Федерального закона
                    от 27.07.2006 N 152-ФЗ "О персональных данных" даю согласие Территориальному фонду обязательного
                    медицинского страхования Республики Хакасия ИНН 1901016625, ОГРН 1021900532092 (далее - оператор),
                    находящемуся по адресу Республика Хакасия, г. Абакан, улица Пушкина, 199 Б, на обработку моих
                    персональных данных в целях регистрации и предоставления доступа к личному кабинету в сервисе
                    Оператора для подачи файлов содержащих сведения персонифицированного учета оказанной медицинской
                    помощи.

                </p>
                <Separator type='space' size='sm' />
                <p className={styles.p}>
                    Под персональными данными понимаю:
                </p>
                <p className={styles.p}>
                    •	фамилию, имя, отчество;
                </p>
                <p className={styles.p}>
                    •	контактные данные (телефон, e-mail);
                </p>
                <Separator type='space' size='sm' />
                <p className={styles.p}>
                    <b>Перечень действий с персональными данными:</b> сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, блокирование, удаление, уничтожение.
                </p>
                <p className={styles.p}>
                    <b>Согласие действует</b> с момента его подписания и до достижения целей обработки или до момента его отзыва мной.
                </p>
                <p className={styles.p}>
                    <b>Я подтверждаю</b>, что согласие является добровольным и может быть отозвано мной в любой момент путём направления письменного уведомления Оператору.
                </p>
                <div className={styles.button_container}>
                    <button
                        onClick={handleAccept}
                        className={styles.button}>
                        Принять
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <title>Heart SVG Icon</title>
                            <path fill="none" stroke="currentColor" stroke-width="2" d="M6.6 7.5c-1.325 1.325-1.4 3.1 0 4.8s5.6 5.6 5.6 5.6s4.3-3.9 5.6-5.6s1.325-3.475 0-4.8a3.394 3.394 0 0 0-4.8 0l-.8.8l-.8-.8a3.394 3.394 0 0 0-4.8 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    )
}