import Button from '../../../ui/Button/Button';
import styles from './styles.module.scss';

const UsersFiltersPanel = () => {


    return (
        <div className={styles.usersFiltersPanelRoot}>
            <div className={styles.filters}>
                <div className={`${styles.filter}`}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>
                    <input placeholder='Поиск по e-mail или коду МО' />
                </div>
            </div>
            <div className={styles.actions}>
                <Button
                    variant='secondary'
                    fullWidth={false}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <circle
                            cx="12"
                            cy="12"
                            r="4"
                            fill="none"
                            stroke='var(--black)'
                            stroke-width="1.5" />
                    </svg>
                    Сбросить фильтры
                </Button>
            </div>
        </div>
    )
};

export default UsersFiltersPanel;