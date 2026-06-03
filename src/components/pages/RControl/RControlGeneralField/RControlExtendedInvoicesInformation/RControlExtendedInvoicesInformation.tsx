import type { Case, FinishedCase } from '../../types';
import Cases from './Cases';

import FinishedCases from './FinishedCases';
import styles from './styles.module.scss';

interface RControlExtendedInvoicesInformationProps {
    isFinishedCasesFetching: boolean;
    isCasesFetching: boolean;
    finishedCases: FinishedCase[];
    cases: Case[];
    fetchCases: (zSlUid: number) => void;
}

const RControlExtendedInvoicesInformation = ({
    isFinishedCasesFetching,
    isCasesFetching,
    finishedCases,
    cases,
    fetchCases }: RControlExtendedInvoicesInformationProps) => {
    return (
        <div className={styles.rControlExtendedInvoicesInformationRoot}>
            <FinishedCases
                isLoading={isFinishedCasesFetching}
                data={finishedCases}
                fetchCases={fetchCases}
            />

            <Cases
                data={cases}
                isLoading={isCasesFetching}
            />
        </div>
    )
};

export default RControlExtendedInvoicesInformation;