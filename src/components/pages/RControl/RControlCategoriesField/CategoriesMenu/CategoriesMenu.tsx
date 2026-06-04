import styles from './styles.module.scss';

const CategoriesMenu = () => {
    return (
        <div className={styles.categoriesMenuRoot}>
            <div className={styles.menu}>
                <ul>

                    <div className={styles.menuItem}>
                        <span className={styles.menuTitle}>Категории Таопао</span>
                    </div>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Пациент / СМО </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Случай / Законченный случай</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Covid</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Онкозаболевания / Консилиум</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Услуги</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>КСГ / ВМП</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Назначения / Направления</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                    <li>
                        <button>
                            <span className={styles.exitSpan}>Дефекты / Санкции СМО</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="var(--black)"
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                            </svg>
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default CategoriesMenu;