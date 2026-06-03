import type { Case } from '../../../types';

import CasesTable from './CasesTable/CasesTable';
import styles from './styles.module.scss';


interface CasesProps {
    isLoading: boolean;
    data: Case[];
};

const Cases = ({
    data,
    isLoading }: CasesProps) => {
    return (
        <div className={styles.casesRoot}>
            <CasesTable
                isLoading={isLoading}
                data={data}
            />
        </div>
    )
};

export default Cases;