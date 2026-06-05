import { useState } from 'react';
import { useRControlStore } from '../../../useRControlStore';
import MiniPagination from '../../../../../ui/MiniPagination';
import styles from './styles.module.scss';

const InvoicesActionPanel = () => {

    const [localGlobalString, setLocalGlobalString] = useState('');
    const {
        invoicesTablePagination,
        setGlobalSearchString,
        goToInvoiceTablePage } = useRControlStore();

    return (
        <div className={styles.invoicesActionPanelRoot}>
            <div className={styles.filters}>
                <div className={`${styles.filter}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>

                    <input
                        placeholder='Поиск по законченным случаям'
                        value={localGlobalString}
                        onChange={(e) => setLocalGlobalString(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setGlobalSearchString('invoices', localGlobalString);
                            }
                        }}
                    />
                </div>
            </div>

            <MiniPagination
                pagination={invoicesTablePagination}
                onPageChange={goToInvoiceTablePage}
            />

        </div>

    );
};

export default InvoicesActionPanel;