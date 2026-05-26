import { useJournal } from '../../../app_lk_journal/general/JournalContext';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import Loader from '../../../ui/Loader';
import Pagination from '../../../ui/Pagination';
import Status from '../../../ui/Status';
import Checkbox from '../../../ui/Checkbox';
import { InvoiceStatus } from '../../../../app/types/InvoiceStatus';
import type { FormatControlJournalRecord } from '../../../pages/FormatControlJournal/types';

interface FormatControlJournalTableProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    data: FormatControlJournalRecord[],
    isLoading: boolean,
    goToPage: (page: number) => void;
    setPageSize: (page: number) => void;

}

const FormatControlJournalTable = ({
    pagination,
    data,
    isLoading,
    goToPage,
    setPageSize
}: FormatControlJournalTableProps) => {

    const [selected, setSelected] = useState<FormatControlJournalRecord[]>([]);
    const { journalType } = useJournal();

    const selectAllItems = (checked: boolean) => {

        if (checked) {
            setSelected(data);
            return;
        }

        setSelected([]);
    }

    const selectItem = (record: FormatControlJournalRecord, checked: boolean) => {

        if (record.status === InvoiceStatus.Processing) {
            return;
        }

        if (checked) {
            setSelected(prev => [...prev, record]);
            return;
        }

        setSelected(selected.filter(f => f.uid !== record.uid));
    }

    useEffect(() => {
        setSelected([])
    }, [pagination?.currentPage, pagination?.pageSize, journalType, data]);


    return (
        <div className={styles.journalTableRoot}>
            <div className={styles.recordCount}>
                <p>Найдено записей: {pagination.totalItems}</p>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <colgroup>
                        <col style={{ width: '2.5rem' }} />
                        <col style={{ width: '2.5rem' }} />
                        <col style={{ width: '14rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '10rem' }} />
                    </colgroup>
                    <thead className={styles.journa_table_head}>
                        <tr>
                            <th>
                                <Checkbox
                                    onChange={selectAllItems}
                                    checked={selected.length === data.filter(item => item.status !== 4).length} />
                            </th>
                            <th>№</th>
                            <th>Имя файла</th>
                            <th>Дата загрузки</th>
                            <th>Код МО</th>
                            <th className={styles.thCenter}>Статус ФК</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className={styles.loaderCell}>
                                    <Loader size='xs' />
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {

                                const hasChecked = selected.includes(item);

                                return (
                                    <tr
                                        onClick={() => selectItem(item, !hasChecked)}
                                        className={hasChecked ? styles.selectedRow : ''}>
                                        <td>
                                            {item.status !== 4 && (
                                                <Checkbox
                                                    checked={hasChecked}
                                                    onChange={(checked) => selectItem(item, checked)}
                                                    onClick={(e) => e.stopPropagation()} />
                                            )}
                                        </td>
                                        <td className={styles.td}>{index + 1}</td>
                                        <td className={styles.td}>{item.sourceArchiveFilename}</td>
                                        <td className={styles.td}>{dayjs(item.uploadDate).format('DD.MM.YYYY HH:mm:ss')}</td>
                                        <td className={styles.td}>{item.organizationCode}</td>
                                        <td className={styles.tdCenter}><Status status={item.status} /></td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    pageSize={pagination.pageSize}
                    totalItems={pagination.totalItems}
                    onPageChange={goToPage}
                    onPageSizeChange={setPageSize} />
            </div>
        </div>
    )
};

export default FormatControlJournalTable;