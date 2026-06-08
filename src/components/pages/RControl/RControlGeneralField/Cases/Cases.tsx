
import CasesTable from './CasesTable/CasesTable';
import styles from './styles.module.scss';


const Cases = () => {

    return (
        <div className={styles.casesRoot}>

            <div className={styles.header}>
                <h2>Случаи в законченном случае</h2>
            </div>

            <CasesTable />
        </div>
    )
};

export default Cases;