import RControlFiltersPanel from './RControlFiltersPanel';

import useRControlData from './useRControlData';
import styles from './styles.module.scss';
import RControlGeneralField from './RControlGeneralField';
import RControlCategoriesField from './RControlCategoriesField/RControlCategoriesField';

const RControl = () => {

    const {
        isBriefInvoicesFetching,
        isFinishedCasesFetching,
        isCasesFetching,
        setFilterParams,
        shortlyInvoices,
        finishedCases,
        cases,
        fetchCases,
        setSelectedInvoice,
        finishedCasesPagination,
        goToPage,
        setGlobalSearchString
    } = useRControlData();

    return (

        <div className={styles.rControlRoot}>

            <RControlFiltersPanel
                setFilterParams={setFilterParams}
            />

            <RControlGeneralField
                setGlobalSearchString={setGlobalSearchString}
                isBriefInvoicesFetching={isBriefInvoicesFetching}
                isFinishedCasesFetching={isFinishedCasesFetching}
                isCasesFetching={isCasesFetching}
                briefInvoices={shortlyInvoices}
                finishedCases={finishedCases}
                cases={cases}
                fetchCases={fetchCases}
                setSelectedInvoice={setSelectedInvoice}
                pagination={finishedCasesPagination}
                goToPage={goToPage}
            />

            <RControlCategoriesField
            />

        </div>
    )
};

export default RControl;