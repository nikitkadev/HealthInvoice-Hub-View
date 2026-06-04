import type { FinishedCase } from '../../types';
import FinishedCasesActionPanel from './FinishedCasesActionPanel/FinishedCasesActionPanel';
import FinishedCasesTable from './FinishedCasesTable';
import styles from './styles.module.scss';

interface FinishedCasesProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    isLoading: boolean;
    data: FinishedCase[];
    setGlobalSearchString: (value: string) => void;
    fetchCases: (zSlUid: number) => void;
    goToPage: (page: number) => void;
}

const FinishedCases = ({
    pagination,
    data,
    fetchCases,
    isLoading,
    goToPage,
    setGlobalSearchString }: FinishedCasesProps) => {
        
    return (

        <div className={styles.FinishedCasesRoot}>

            <div className={styles.header}>
                <h2>Законченные случаи по счету {}</h2>
            </div>

            <FinishedCasesActionPanel
                data={data}
                setGlobalSearchString={setGlobalSearchString}
                pagination={pagination}
                goToPage={goToPage}
            />

            <FinishedCasesTable
                isLoading={isLoading}
                data={data}
                fetchCases={fetchCases}
            />

        </div>
    )
};

export default FinishedCases;