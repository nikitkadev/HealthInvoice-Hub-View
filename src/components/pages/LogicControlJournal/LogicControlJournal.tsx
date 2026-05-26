import { useJournalData } from '../../app_lk_journal/general/JournalData';

import LogicControlJournalActionPanel from '../../widgets/LogicControlJournal/LogicControlJournalActionPanel';
import LogicControlJournalFiltersPanel from '../../widgets/LogicControlJournal/LogicControlJournalFiltersPanel/LogicControlJournalFiltersPanel';
import LogicControlJournalTable from '../../widgets/LogicControlJournal/LogicControlJournalTable';

import styles from './styles.module.scss';

const LogicControlJournal = () => {

    const {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize,
        refreshData,
        resetFilters,
        onChangeFilter } = useJournalData();

    return (
        <div className={styles.journalRoot}>

            <LogicControlJournalActionPanel
                refreshData={refreshData} />

            <LogicControlJournalFiltersPanel
                resetFilters={resetFilters}
                setFilters={onChangeFilter} />

            <LogicControlJournalTable
                pagination={pagination}
                data={data}
                isLoading={isLoading}
                goToPage={goToPage}
                setPageSize={setPageSize} />
        </div>
    )
};

export default LogicControlJournal;