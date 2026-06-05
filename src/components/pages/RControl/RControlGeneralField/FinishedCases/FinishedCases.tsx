import FinishedCasesActionPanel from './FinishedCasesActionPanel/FinishedCasesActionPanel';
import FinishedCasesTable from './FinishedCasesTable';
import styles from './styles.module.scss';

const FinishedCases = () => {

    return (

        <div className={styles.FinishedCasesRoot}>

            <div className={styles.header}>
                <h2>Законченные случаи по счету { }</h2>
            </div>

            <FinishedCasesActionPanel />
            <FinishedCasesTable />

        </div>
    )
};

export default FinishedCases;