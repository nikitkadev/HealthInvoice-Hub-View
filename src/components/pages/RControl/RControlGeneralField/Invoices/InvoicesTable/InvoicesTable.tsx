
import { useEffect, useState } from 'react';
import useInvoicesTableData from './useInvoicesTableData';
import { useRControlStore } from '../../../useRControlStore';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';
import dayjs from 'dayjs';
import styles from './styles.module.scss';


const InvoicesTable = () => {

    const [activeInvoice, setActiveInvoice] = useState<number | null>(null);
    const {
        setSelectedInvoice,
        isLoading,
        invoicesData } = useRControlStore();
    const { journalType } = useJournal();

    useInvoicesTableData();

    useEffect(() => {
        setActiveInvoice(null);
    }, [journalType]);

    return (

        <div className={styles.InvoicesTableRoot}>

            {isLoading.invoices && (<OverlayLoader />)}
            
            <table>
                <thead className={styles.tableHead}>
                    <tr>
                        <th>№ счета</th>
                        <th>Дата счета</th>
                        <th>Сумма, руб.</th>
                        <th>Случаев</th>
                        <th>Статус</th>
                    </tr>
                </thead>

                <tbody>

                    {invoicesData.length === 0 ? (
                        <tr className={styles.emptyDataRow}>
                            <td colSpan={5}>
                                <span>Данных не найдено</span>
                            </td>
                        </tr>
                    ) : (
                        invoicesData.map(item => (
                            <tr
                                className={activeInvoice === item.schetUid ? styles.activeRow : ''}
                                onClick={() => {
                                    setSelectedInvoice(item)
                                    setActiveInvoice(item.schetUid)
                                }}>
                                <td>{item.nSchet}</td>
                                <td>{dayjs(item.dSchet).format('DD.MM.YYYY')}</td>
                                <td>{item.summav}</td>
                                <td>{item.sdZ}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );

};

export default InvoicesTable;