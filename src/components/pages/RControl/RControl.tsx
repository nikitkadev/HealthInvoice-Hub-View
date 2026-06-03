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
        fetchFinishedCases,
        fetchCases } = useRControlData();

    return (

        <div className={styles.rControlRoot}>

            <RControlFiltersPanel
                setFilterParams={setFilterParams}
            />

            <RControlGeneralField
                isBriefInvoicesFetching={isBriefInvoicesFetching}
                isFinishedCasesFetching={isFinishedCasesFetching}
                isCasesFetching={isCasesFetching}
                briefInvoices={shortlyInvoices}
                finishedCases={finishedCases}
                fetchFinishedInvoices={fetchFinishedCases}
                cases={cases}
                fetchCases={fetchCases}
            />

            <RControlCategoriesField
            />

        </div>
    )
};

export default RControl;