import type { InvoiceShortly } from '../../../types';

import dayjs from 'dayjs';
import styles from './styles.module.scss';
import DefaultLoader from '../../../../../ui/Loaders/DefaultLoader';
import { useEffect, useState } from 'react';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';

interface RControlBriefInvoicesTableProps {
    isLoading: boolean;
    data: InvoiceShortly[];
    setSelectedInvoice: (invoice: InvoiceShortly) => void;
};

const RControlBriefInvoicesTable = ({
    data,
    isLoading,
    setSelectedInvoice }: RControlBriefInvoicesTableProps) => {

    const [activeInvoice, setActiveInvoice] = useState<number | null>(null);

    const { journalType } = useJournal();

    useEffect(() => {
        setActiveInvoice(null);
    }, [journalType])

    return (
        <div className={styles.rControlBriefInvoicesTableRoot}>
            <div className={styles.tableContainer}>
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

                        {isLoading ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={5} className={styles.loaderCell}>
                                    <DefaultLoader />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
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
                                </tr>
                            ))
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default RControlBriefInvoicesTable;