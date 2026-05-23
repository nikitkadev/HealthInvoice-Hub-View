import { useJournalData } from '../../app_lk_journal/general/JournalData';
import JournalActionPanel from '../../widgets/JournalActionPanel';
import JournalFiltersPanel from '../../widgets/JournalFiltersPanel/JournalFiltersPanel';
import JournalTable from '../../widgets/JournalTable';
import styles from './styles.module.scss';

const Journal = () => {

    const { data, isLoading, pagination, goToPage, setPageSize, refreshData } = useJournalData();

    return (
        <div className={styles.journalRoot}>

            <JournalActionPanel
                refreshData={refreshData} />
            <JournalFiltersPanel />
            <JournalTable
                pagination={pagination}
                data={data}
                isLoading={isLoading}
                goToPage={goToPage}
                setPageSize={setPageSize} />
        </div>
    )
};

export default Journal;