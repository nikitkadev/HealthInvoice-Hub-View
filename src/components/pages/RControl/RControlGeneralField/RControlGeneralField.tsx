import type { Case, FinishedCase, InvoiceShortly } from '../types';
import Cases from './Cases';
import FinishedCases from './FinishedCases';
import Invoices from './Invoices/Invoices';

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
            <Invoices
                data={briefInvoices}
                isLoading={isBriefInvoicesFetching}
                setSelectedInvoice={setSelectedInvoice} />

            <FinishedCases
                pagination={pagination}
                isLoading={isFinishedCasesFetching}
                data={finishedCases}
                fetchCases={fetchCases}
                goToPage={goToPage}
                setGlobalSearchString={setGlobalSearchString}
            />

            <Cases
                data={cases}
                isLoading={isCasesFetching}
            />
        </div>
    )
};

export default RControlGeneralField;