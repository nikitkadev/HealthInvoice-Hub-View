import FormatControlJournalActionPanel from '../../widgets/FormatControlJournal/FormatControlJournalActionPanel';
import FormatControlJournalTable from '../../widgets/FormatControlJournal/FormatControlJournalTable';
import useFormatControlJournalData from './useFormatControlJournalData';

import styles from './styles.module.scss';

const FormatControlJournal = () => {

    const {
        refreshData,
        data,
        pagination,
        goToPage,
        setPageSize,
        isLoading } = useFormatControlJournalData();

    return (
        <div className={styles.journalRoot}>

            <FormatControlJournalActionPanel
                refreshData={refreshData} />

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