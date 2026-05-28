import type { FormatControlJournalRecord } from '../../../pages/FormatControlJournal/types';

import Pagination from '../../../ui/Pagination';
import Status from '../../../ui/Status';
import DefaultLoader from '../../../ui/Loaders/DefaultLoader';

import dayjs from 'dayjs';
import styles from './styles.module.scss';
import FormatControlJournalContextMenu from '../../../ui/ContextMenu/FormatControlJournalContextMenu';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../../shared/api/ApiClient';
import { useJournal } from '../../../../app/contexts/JournalTypeContext';
import { toast } from 'react-toastify';

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

    const [isDownloading, setIsDownloading] = useState(false);
    const [conextMenu, setContextMenu] = useState<
        {
            visiable: boolean,
            posX: number,
            posY: number,
            selectedInvoiceFilename: string,

        }>({
            visiable: false,
            posX: 0,
            posY: 0,
            selectedInvoiceFilename: ''
        });

    const { journalType } = useJournal();

    const downloadReport = async () => {

        setIsDownloading(true);

        try {

            closeContextMenu();

            await api.downloadFormatValidationReportFile(
                '/report/download-format',
                conextMenu.selectedInvoiceFilename,
                journalType);

            toast.success("Файл успешно загружен!");
        }
        catch {
            toast.error("Произошла ошибка при скачивание файла ответа ФК!");
        }
        finally {
            setIsDownloading(false);
        }
    }

    const openContextMenu = (e: React.MouseEvent, record: FormatControlJournalRecord) => {

        e.preventDefault();

        setContextMenu({
            visiable: true,
            posX: e.clientX,
            posY: e.clientY,
            selectedInvoiceFilename: record.sourceArchiveFilename
        });
    };

    const closeContextMenu = useCallback(() => {
        setContextMenu({
            visiable: false,
            posX: 0,
            posY: 0,
            selectedInvoiceFilename: ''
        });
    }, []);

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);

        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    }, []);

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
                        {isLoading || isDownloading ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={5}>
                                    <DefaultLoader />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={5}>
                                    <span>Данных не найдено</span>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                return (
                                    <tr
                                        onContextMenu={(e) => openContextMenu(e, item)}>
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
                <FormatControlJournalContextMenu
                    downloadReport={downloadReport}
                    posX={conextMenu.posX}
                    posY={conextMenu.posY}
                    visiable={conextMenu.visiable}
                    selectedFilename={conextMenu.selectedInvoiceFilename} />
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