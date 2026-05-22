import { Pagination } from '../../shared/ui/pagination/Pagination';
import { useFkJournalData } from './FkJournalData';
import { Status } from '../../shared/ui/status/Status';
import { api } from '../../shared/api/ApiClient';
import { useJournal } from '../app_lk_journal/general/JournalContext';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import styles from './FkJournalPage.module.css';
import Loader from '../ui/Loader';

export const FkJournalPage = () => {

    const [rowContextMenu, setRowContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        invoiceName: string;
    }>({ visible: false, x: 0, y: 0, invoiceName: "default_name" });

    const handleRowContextMenu = (e: React.MouseEvent, invoiceName: string) => {
        e.preventDefault();
        e.stopPropagation();
        setRowContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            invoiceName
        });
    };

    const closeRowContextMenu = () => {
        setRowContextMenu(prev => ({ ...prev, visible: false }));
    };

    useEffect(() => {
        const handleClickOutside = () => {
            closeRowContextMenu();
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeRowContextMenu();
            };
        };

        if (rowContextMenu.visible) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [rowContextMenu.visible])

    const {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize } = useFkJournalData();

    const { journalType } = useJournal();

    const downloadFeedbackFileAsync = async (filename: string) => {
        try {
            await api.downloadFormatValidationReportFile('/report/download-format', filename, journalType);
            toast.success("Файл успешно сохранен!");
        }
        catch {
            toast.error("Произошла ошибка при попытке скачать файл");
        }
    }

    if (isLoading) {
        return <Loader size='xs' />
    }

    return (

        <div className={styles.container}>
            <div className={styles.control_panel}>
                <div className={styles.control_panel_container_actions}>
                    <Pagination
                        currentPage={pagination?.currentPage ?? 1}
                        pageSize={pagination?.pageSize ?? 25}
                        totalPages={pagination?.totalPages ?? 1}
                        totalItems={pagination?.totalItems ?? 0}
                        onPageChange={goToPage}
                        onPageSizeChange={setPageSize} />
                </div>
            </div >
            <div className={styles.table_container}>
                <table className={styles.journal_table}>
                    <colgroup>
                        <col style={{ width: '2rem' }} />
                        <col style={{ width: '7rem' }} />
                        <col style={{ width: '4rem' }} />
                        <col style={{ width: '4rem' }} />
                        <col style={{ width: '3rem' }} />
                        <col style={{ width: '1rem' }} />
                    </colgroup>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>№</th>
                            <th className={styles.th}>Имя файла</th>
                            <th className={styles.th}>Дата выгрузки</th>
                            <th className={styles.th}>Код МО</th>
                            <th className={styles.thCenter}>Статус</th>
                            <th className={styles.th} />
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {data.map((item, index) => {
                            return (
                                <tr
                                    onContextMenu={(e) => handleRowContextMenu(e, item.sourceArchiveFilename)}
                                    className={styles.tr_body}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{item.sourceArchiveFilename}</td>
                                    <td className={styles.td}>{dayjs(item.uploadDate).format('DD.MM.YYYY')}</td>
                                    <td className={styles.td}>{item.organizationCode}</td>
                                    <td className={styles.tdCenter}>
                                        {item.status === 1 && (
                                            <Status text='Успешно' type='success' />
                                        )}
                                        {item.status === 0 && (
                                            <Status text='Ошибка' type='error' />
                                        )}
                                    </td>
                                    <td className={styles.td} />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {(rowContextMenu.visible) && (
                    <div
                        className={styles.contextMenu}
                        style={{ top: rowContextMenu.y, left: rowContextMenu.x }}
                    >
                        <div className={styles.context_menu_header}>{rowContextMenu.invoiceName}</div>
                        <button onClick={() => downloadFeedbackFileAsync(rowContextMenu.invoiceName)}>
                            Скачать ответ ФК
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-width="1"
                                    d="m7 10l4.859 4.859a.2.2 0 0 0 .282 0L17 10" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}
