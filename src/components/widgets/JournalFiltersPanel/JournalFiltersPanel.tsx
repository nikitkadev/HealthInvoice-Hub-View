import styles from './styles.module.scss';

const JournalFiltersPanel = () => {
    return (
        <div className={styles.journalFiltersPanelRoot}>
            <input placeholder='Поиск по коду МО, файлу, пользователю или номеру счета' />
        </div>
    )
};

export default JournalFiltersPanel;