
import CasesTable from './CasesTable/CasesTable';
import styles from './styles.module.scss';


const Cases = () => {
    return (
        <div className={styles.casesRoot}>

            <CasesTable />
        </div>
    )
};

export default Cases;