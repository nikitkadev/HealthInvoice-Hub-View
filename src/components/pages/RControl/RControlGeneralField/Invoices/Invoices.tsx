import InvoicesActionPanel from './InvoicesActionPanel';
import InvoicesTable from './InvoicesTable';
import InvoiceSummaryCard from './InvoiceSummaryCard/InvoiceSummaryCard';
import styles from './styles.module.scss';


const Invoices = () => {
    return (

        <div className={styles.invoicesRoot}>
            <div className={styles.general}>

                <div className={styles.header}>
                    <h2>Счета</h2>
                </div>

                <InvoicesActionPanel />
                <InvoicesTable />

            </div>
            <div className={styles.summary}>
                <InvoiceSummaryCard />
            </div>
        </div>

    );
};

export default Invoices;