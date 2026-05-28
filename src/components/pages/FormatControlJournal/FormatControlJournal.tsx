import { useAuth } from '../../app_auth/auth_service/AuthProvider';

import FormatControlJournalActionPanel from '../../widgets/FormatControlJournal/FormatControlJournalActionPanel';
import FormatControlJournalTable from '../../widgets/FormatControlJournal/FormatControlJournalTable';
import FormatControlJournalFiltersPanel from '../../widgets/FormatControlJournal/FormatControlJournalFiltersPanel';
import useFormatControlJournalData from './useFormatControlJournalData';

import styles from './styles.module.scss';
import { useEffect } from 'react';

const FormatControlJournal = () => {

    const {
        refreshData,
        data,
        pagination,
        goToPage,
        setPageSize,
        isLoading,
        isApplied,
        onChangeFilter,
        resetFilters } = useFormatControlJournalData();

    const { isAdmin } = useAuth();

    useEffect(() => {
        document.title = "HIH - Журнал ФК";
    }, []);

    return (
        <div className={styles.journalRoot}>

            <FormatControlJournalActionPanel
                refreshData={refreshData} />

            {isAdmin && (
                <FormatControlJournalFiltersPanel
                    isApplied={isApplied}
                    resetFilters={resetFilters}
                    setFilters={onChangeFilter} />
            )}

            <FormatControlJournalTable
                data={data}
                goToPage={goToPage}
                isLoading={isLoading}
                pagination={pagination}
                setPageSize={setPageSize} />

        </div>
    )
};

export default FormatControlJournal;