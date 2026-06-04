
import type { InvoiceShortly } from '../../../types';
import { useEffect, useState } from 'react';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';
import DefaultLoader from '../../../../../ui/Loaders/DefaultLoader';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

interface InvoicesTableProps {
    isLoading: boolean;
    data: InvoiceShortly[];
    setSelectedInvoice: (invoice: InvoiceShortly) => void;
};

const InvoicesTable = ({
    data,
    isLoading,
    setSelectedInvoice }: InvoicesTableProps) => {

    const [activeInvoice, setActiveInvoice] = useState<number | null>(null);

    const { journalType } = useJournal();

    useEffect(() => {
        setActiveInvoice(null);
    }, [journalType])


    const mockInvoices: InvoiceShortly[] = [
        {
            schetUid: 1001,
            nSchet: 'INV-2026-001',
            dSchet: new Date('2026-06-01'),
            summav: 1250.5,
            sdZ: 15,
            status: 1,
        },
        {
            schetUid: 1002,
            nSchet: 'INV-2026-002',
            dSchet: new Date('2026-06-02'),
            summav: 3499.99,
            sdZ: 0,
            status: 2,
        },
        {
            schetUid: 1003,
            nSchet: 'INV-2026-003',
            dSchet: new Date('2026-06-03'),
            summav: 870.0,
            sdZ: 7,
            status: 3,
        },
        {
            schetUid: 1004,
            nSchet: 'INV-2026-004',
            dSchet: new Date('2026-06-04'),
            summav: 15600.75,
            sdZ: 30,
            status: 1,
        },
        {
            schetUid: 1005,
            nSchet: 'INV-2026-005',
            dSchet: new Date('2026-06-05'),
            summav: 420.0,
            status: 0,
        },
        {
            schetUid: 1006,
            nSchet: 'INV-2026-006',
            dSchet: new Date('2026-06-06'),
            summav: 9999.99,
            sdZ: 45,
            status: 4,
        },
        {
            schetUid: 1007,
            nSchet: 'INV-2026-007',
            dSchet: new Date('2026-06-07'),
            summav: 2500,
            sdZ: 3,
            status: 2,
        },
        {
            schetUid: 1008,
            nSchet: 'INV-2026-008',
            dSchet: new Date('2026-06-08'),
            summav: 760.45,
            status: 1,
        },
        {
            schetUid: 1001,
            nSchet: 'INV-2026-001',
            dSchet: new Date('2026-06-01'),
            summav: 1250.5,
            sdZ: 15,
            status: 1,
        },
        {
            schetUid: 1002,
            nSchet: 'INV-2026-002',
            dSchet: new Date('2026-06-02'),
            summav: 3499.99,
            sdZ: 0,
            status: 2,
        }
    ];

    return (
        <div className={styles.InvoicesTableRoot}>
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
                    ) : mockInvoices.length === 0 ? (
                        <tr className={styles.emptyDataRow}>
                            <td colSpan={5}>
                                <span>Данных не найдено</span>
                            </td>
                        </tr>
                    ) : (
                        mockInvoices.map(item => (
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