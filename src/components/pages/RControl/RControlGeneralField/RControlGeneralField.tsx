import type { Case, FinishedCase, InvoiceShortly } from '../types';

import RControlBriefInvoicesInformation from './RControlBriefInvoicesInformation/RControlBriefInvoicesInformation';
import RControlExtendedInvoicesInformation from './RControlExtendedInvoicesInformation';

import styles from './styles.module.scss';

interface RControlGeneralFieldProps {
    isBriefInvoicesFetching: boolean;
    isFinishedCasesFetching: boolean;
    isCasesFetching: boolean;
    briefInvoices: InvoiceShortly[];
    finishedCases: FinishedCase[];
    cases: Case[];
    fetchFinishedInvoices: (schetUid: number) => void;
    fetchCases: (zSlUid: number) => void;
}

const RControlGeneralField = ({
    isBriefInvoicesFetching,
    isFinishedCasesFetching,
    isCasesFetching,
    briefInvoices,
    finishedCases,
    cases,
    fetchFinishedInvoices,
    fetchCases }: RControlGeneralFieldProps) => {

    return (
        <div className={styles.rControlGeneralFieldRoot}>

            <RControlBriefInvoicesInformation
                data={briefInvoices}
                fetchFinishedInvoices={fetchFinishedInvoices}
                isBriefInvoicesFetching={isBriefInvoicesFetching}
            />

            <RControlExtendedInvoicesInformation
                finishedCases={finishedCases}
                cases={cases}
                fetchCases={fetchCases}
                isCasesFetching={isCasesFetching}
                isFinishedCasesFetching={isFinishedCasesFetching}
            />

        </div>
    )
};

export default RControlGeneralField;