import type { FormatControlJournalRecord } from '../../../pages/FormatControlJournal/types';

import Pagination from '../../../ui/Pagination';
import Status from '../../../ui/Status';
import DefaultLoader from '../../../ui/Loaders/DefaultLoader';

import dayjs from 'dayjs';
import styles from './styles.module.scss';

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

    return (
        <div className={styles.journalTableRoot}>
            <div className={styles.recordCount}>
                <p>Найдено записей: {pagination.totalItems}</p>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <colgroup>
                        <col style={{ width: '2.5rem' }} />
                        <col style={{ width: '14rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '10rem' }} />
                    </colgroup>
                    <thead className={styles.journa_table_head}>
                        <tr>
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
                                    <DefaultLoader />
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                return (
                                    <tr>
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