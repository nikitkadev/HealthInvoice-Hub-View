import type { InvoiceShortly } from '../../types';
import InvoicesTable from './InvoicesTable';
import styles from './styles.module.scss';

interface InvoicesProps {
    isLoading: boolean;
    data: InvoiceShortly[];
    setSelectedInvoice: (invoice: InvoiceShortly) => void;
};

const Invoices = ({ isLoading, data, setSelectedInvoice }: InvoicesProps) => {
    return (

        <div className={styles.invoicesRoot}>
            <div className={styles.general}>
                <div className={styles.header}>
                    <h2>Счета</h2>
                </div>

                <InvoicesTable
                    isLoading={isLoading}
                    data={data}
                    setSelectedInvoice={setSelectedInvoice}
                />

            </div>

            <div className={styles.summary}>
                Пук пук пук пук пук пук
            </div>

        </div>
    );
};

export default Invoices;