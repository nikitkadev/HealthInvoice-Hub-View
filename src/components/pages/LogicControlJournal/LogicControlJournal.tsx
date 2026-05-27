import { useEffect } from 'react';
import { useAuth } from '../../app_auth/auth_service/AuthProvider';

import LogicControlJournalActionPanel from '../../widgets/LogicControlJournal/LogicControlJournalActionPanel';
import LogicControlJournalFiltersPanel from '../../widgets/LogicControlJournal/LogicControlJournalFiltersPanel/LogicControlJournalFiltersPanel';
import LogicControlJournalTable from '../../widgets/LogicControlJournal/LogicControlJournalTable';

import styles from './styles.module.scss';
import useLogicControlJournalData from './useLogicControlJournalData';

const LogicControlJournal = () => {

    const {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize,
        refreshData,
        resetFilters,
        onChangeFilter,
        isApplied } = useLogicControlJournalData();

    const { isAdmin } = useAuth();

    useEffect(() => {
        document.title = "HIH - Журнал ЛК"
    }, []);

    return (
        <div className={styles.journalRoot}>

            <LogicControlJournalActionPanel
                refreshData={refreshData} />

            {isAdmin && (
                <LogicControlJournalFiltersPanel
                    resetFilters={resetFilters}
                    setFilters={onChangeFilter}
                    isApplied={isApplied} />
            )}

            <LogicControlJournalTable
                pagination={pagination}
                data={data}
                refreshData={refreshData}
                isLoading={isLoading}
                goToPage={goToPage}
                setPageSize={setPageSize} />
        </div>
    )
};

export default LogicControlJournal;