import type { FinishedCase } from '../../../types';
import FinishedCasesActionPanel from './FinishedCasesActionPanel/FinishedCasesActionPanel';
import FinishedCasesTable from './FinishedCasesTable';
import styles from './styles.module.scss';

interface FinishedCasesProps {
    isLoading: boolean;
    data: FinishedCase[];
    fetchCases: (zSlUid: number) => void;

}

const FinishedCases = ({
    data,
    fetchCases,
    isLoading }: FinishedCasesProps) => {
    return (
        <div className={styles.FinishedCasesRoot}>

            <FinishedCasesActionPanel
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