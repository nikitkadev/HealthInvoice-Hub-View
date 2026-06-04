import type { Case, FinishedCase, InvoiceShortly } from '../types';

import RControlBriefInvoicesInformation from './RControlBriefInvoicesInformation/RControlBriefInvoicesInformation';
import RControlExtendedInvoicesInformation from './RControlExtendedInvoicesInformation';

import styles from './styles.module.scss';

interface RControlGeneralFieldProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    isBriefInvoicesFetching: boolean;
    isFinishedCasesFetching: boolean;
    isCasesFetching: boolean;
    briefInvoices: InvoiceShortly[];
    finishedCases: FinishedCase[];
    cases: Case[];
    fetchCases: (zSlUid: number) => void;
    goToPage: (page: number) => void;
    setGlobalSearchString: (value: string) => void;
    setSelectedInvoice: (invoice: InvoiceShortly) => void;
}

const RControlGeneralField = ({
    setSelectedInvoice,
    pagination,
    isBriefInvoicesFetching,
    isFinishedCasesFetching,
    isCasesFetching,
    briefInvoices,
    finishedCases,
    cases,
    fetchCases,
    goToPage,
    setGlobalSearchString }: RControlGeneralFieldProps) => {


    return (
        <div className={styles.rControlGeneralFieldRoot}>

            <RControlBriefInvoicesInformation
                data={briefInvoices}
                isBriefInvoicesFetching={isBriefInvoicesFetching}
                setSelectedInvoice={setSelectedInvoice}
            />

            <RControlExtendedInvoicesInformation
                setGlobalSearchString={setGlobalSearchString}
                pagination={pagination}
                finishedCases={finishedCases}
                cases={cases}
                fetchCases={fetchCases}
                isCasesFetching={isCasesFetching}
                isFinishedCasesFetching={isFinishedCasesFetching}
                goToPage={goToPage}
            />

        </div>
    )
};

export default RControlGeneralField;