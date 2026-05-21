import JournalActionPanel from '../../widgets/JournalActionPanel';
import JournalFiltersPanel from '../../widgets/JournalFiltersPanel/JournalFiltersPanel';
import JournalTable from '../../widgets/JournalTable';
import styles from './styles.module.scss';

const Journal = () => {
    return (
        <div className={styles.journalRoot}>
            <JournalActionPanel />
            <JournalFiltersPanel />
            <JournalTable />
        </div>
    )
};

export default Journal;