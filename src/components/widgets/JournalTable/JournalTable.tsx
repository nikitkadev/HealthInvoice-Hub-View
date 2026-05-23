import dayjs from 'dayjs';
import Status from '../../ui/Status';
import styles from './styles.module.scss';
import Loader from '../../ui/Loader';
import Pagination from '../../ui/Pagination';
import type { JournalRecord } from '../../app_lk_journal/general/JournalData';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { useJournal } from '../../app_lk_journal/general/JournalContext';

interface JournalTableProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    data: JournalRecord[],
    isLoading: boolean,
    goToPage: (page: number) => void;
    setPageSize: (page: number) => void;
}

const JournalTable = ({
    pagination,
    data,
    isLoading,
    goToPage,
    setPageSize
}: JournalTableProps) => {

    const [selected, setSelected] = useState<JournalRecord[]>([]);
    const { journalType } = useJournal();

    const selectAllItems = (checked: boolean) => {
        if (checked) {
            setSelected(data);
            return;
        }

        setSelected([]);
    }

    const selectItem = (record: JournalRecord, checked: boolean) => {
        if (checked) {
            setSelected(prev => [...prev, record]);
            return;
        }

        setSelected(selected.filter(f => f.schetUid !== record.schetUid));
    }

    useEffect(() => {
        setSelected([])
    }, [pagination?.currentPage, pagination?.pageSize, journalType, data])

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
                        <col style={{ width: '8rem' }} />
                        <col style={{ width: '12rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '8rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '10rem' }} />
                    </colgroup>
                    <thead className={styles.journa_table_head}>
                        <tr>
                            <th>
                                <Checkbox
                                    onChange={selectAllItems}
                                    checked={selected.length === data.length} /></th>
                            <th>№</th>
                            <th>Дата загрузки</th>
                            <th>Загрузил</th>
                            <th>Имя файла</th>
                            <th>Код МО</th>
                            <th>Номер счета</th>
                            <th>Дата выставления</th>
                            <th>Обработано</th>
                            <th>Ошибочных</th>
                            <th className={styles.thCenter}>Статус МЭК</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={11} className={styles.loaderCell}>
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
                                            <Checkbox
                                                checked={hasChecked}
                                                onChange={(checked) => selectItem(item, checked)}
                                                onClick={(e) => e.stopPropagation()} />
                                        </td>
                                        <td className={styles.td}>{index + 1}</td>
                                        <td className={styles.td}>{dayjs(item.uploadDate).format('DD.MM.YYYY HH:mm:ss')}</td>
                                        <td className={styles.td}>{item.uploader}</td>
                                        <td className={styles.td}>{item.fileName}</td>
                                        <td className={styles.td}>{item.codeMO}</td>
                                        <td className={styles.td}>{item.nSchet}</td>
                                        <td className={styles.td}>{dayjs(item.dSchet).format('DD.MM.YYYY')}</td>
                                        <td className={styles.td}>{item.countSdZ}</td>
                                        <td className={styles.td}>{item.countError}</td>
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

export default JournalTable;