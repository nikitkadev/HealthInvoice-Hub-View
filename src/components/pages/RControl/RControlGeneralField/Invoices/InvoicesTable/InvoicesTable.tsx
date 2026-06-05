
import { useEffect, useState } from 'react';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';
import { useRControlStore } from '../../../useRControlStore';
import useInvoicesTableData from './useInvoicesTableData';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';
import Status from '../../../../../ui/Status';
import { InvoiceStatus } from '../../../../../../app/types/InvoiceStatus';


const InvoicesTable = () => {

    const [activeInvoice, setActiveInvoice] = useState<number | null>(null);
    const { data } = useInvoicesTableData();
    const {
        setSelectedInvoice,
        isLoading } = useRControlStore();
    const { journalType } = useJournal();



    useEffect(() => {
        setActiveInvoice(null);
    }, [journalType])

    return (
        <div className={styles.InvoicesTableRoot}>

            <table>
                {isLoading.invoices && (<OverlayLoader />)}
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

                    {data.length === 0 ? (
                        <tr className={styles.emptyDataRow}>
                            <td colSpan={5}>
                                <span>Данных не найдено</span>
                            </td>
                        </tr>
                    ) : (
                        data.map(item => (
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
                                {/* <td>
                                    {item.status === -1 && (
                                        <Status status={InvoiceStatus.WaitingEnd} />

                                    )}
                                </td> */}

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );

};

export default InvoicesTable;