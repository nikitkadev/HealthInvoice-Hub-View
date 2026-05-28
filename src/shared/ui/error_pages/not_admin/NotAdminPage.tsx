import styles from './NotAdminPage.module.css'

export const NotAdminPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3 className={styles.h3}>Воу! Интересненько!</h3>
                <p className={styles.p}>
                    Эта страница только для администраторов приложения, но я удивлен, что вы смогли сюда попасть.
                    <br /><br />Свяжитесь со мною и скажите секретный код за который можно получить символический приз:
                    <br /><br /><b>Варлок лучший класс в игре</b>
                </p>
            </div>
        </div >
    )
}