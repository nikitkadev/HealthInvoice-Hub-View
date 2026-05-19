import GorizontalSeporator from '../../ui/Seporators/GorizontalSeporator';
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div className={styles.homeRoot}>
            <h1>Добро пожаловать в HealthInvoice Hub!</h1>
            <GorizontalSeporator type='line' size='lg' color='var(--gray-400)' />
            <h3>Дисклеймер:</h3>
            <GorizontalSeporator type='space' size='xs' />
            <p>
                "ЧИХ" (обиходное название данной платформы) сейчас в активной разработке,
                поэтому давайте будем честными: всё,
                что здесь происходит, ползает через
                удивительную технологию VipNet,
                которая сама по себе уже испытание на прочность.
                Ситуация печальная, но выбора нет...
                Я это к тому, что проблем с работой не избежать, но мы все дружно постараемся!
            </p>
            <GorizontalSeporator type='space' size='xs' />
            <p>
                Пожалуйста, не бойтесь сломать работу тестовой площадки!
                Это не катастрофа, а наша текущая цель.
                На этом этапе мы как раз ищем узкие места нашей программы.
                Самым активным выдадим достижение и отдельное место в наших сердцах!
            </p>
            <GorizontalSeporator type='space' size='md' />
            <h3>Начало работы:</h3>
            <GorizontalSeporator type='space' size='xs' />
            <p className={styles.p}>
                Справа сверху находится главное меню.
                Через него можно перемещаться по сервису:
                профиль, журнал, страница c инструкцией, а так же оттуда можно выйти из своего профиля.
                Перед обращением в ТФОМС РХ обязательно изучите инструкцию. Если ваш вопрос не описан — напишите или позвоните нам.
            </p>
        </div>
    )
}

export default Home;