import type { Case, FinishedCase } from '../../types';
import Cases from './Cases';

import FinishedCases from './FinishedCases';
import styles from './styles.module.scss';

interface RControlExtendedInvoicesInformationProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    isFinishedCasesFetching: boolean;
    isCasesFetching: boolean;
    finishedCases: FinishedCase[];
    cases: Case[];
    setGlobalSearchString: (value: string) => void;
    fetchCases: (zSlUid: number) => void;
    goToPage: (page: number) => void;
}

const RControlExtendedInvoicesInformation = ({
    pagination,
    isFinishedCasesFetching,
    isCasesFetching,
    finishedCases,
    cases,
    fetchCases,
    goToPage,
    setGlobalSearchString }: RControlExtendedInvoicesInformationProps) => {
    return (
        <div className={styles.rControlExtendedInvoicesInformationRoot}>
            <FinishedCases
                setGlobalSearchString={setGlobalSearchString}
                pagination={pagination}
                isLoading={isFinishedCasesFetching}
                data={finishedCases}
                fetchCases={fetchCases}
                goToPage={goToPage}
            />

            <Cases
                data={cases}
                isLoading={isCasesFetching}
            />
        </div>
    )
};

export default RControlExtendedInvoicesInformation;