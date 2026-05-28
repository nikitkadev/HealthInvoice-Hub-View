import type { SortState } from '../../../pages/LogicControlJournal/types';
import type { LogicControlJournalRecord } from '../../../pages/LogicControlJournal/types';

import { SortIcon } from '../../../../shared/ui/icons/SortIcon';
import { InvoiceStatus } from '../../../../app/types/InvoiceStatus';
import { useJournal } from '../../../../app/contexts/JournalTypeContext';
import { toast } from 'react-toastify';
import { api } from '../../../../shared/api/ApiClient';
import React, { useEffect, useState } from 'react';

import LogicControlJournalContextMenu from '../../../ui/ContextMenu/LogicControlJournalContextMenu';
import Pagination from '../../../ui/Pagination';
import Status from '../../../ui/Status';
import Checkbox from '../../../ui/Checkbox';
import DefaultLoader from '../../../ui/Loaders/DefaultLoader';

import dayjs from 'dayjs';
import styles from './styles.module.scss';
import Button from '../../../ui/Button/Button';

interface LogicControlJournalTableProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    data: LogicControlJournalRecord[],
    isLoading: boolean,
    sort: SortState;
    refreshData: () => void;
    goToPage: (page: number) => void;
    setPageSize: (page: number) => void;
    handleSort: (column: string) => void;

}

const LogicControlJournalTable = ({
    pagination,
    data,
    isLoading,
    goToPage,
    setPageSize,
    refreshData,
    sort,
    handleSort
}: LogicControlJournalTableProps) => {

    const [selected, setSelected] = useState<LogicControlJournalRecord[]>([]);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const { journalType } = useJournal();
    const [contextMenu, setContextMenu] = useState({
        visiable: false,
        poxX: 0,
        posY: 0
    });

    const selectAllItems = (checked: boolean) => {

        if (checked) {
            setSelected(data.filter(item => item.status !== InvoiceStatus.Processing));
            return;
        }

        setSelected([]);
    }

    const selectItem = (record: LogicControlJournalRecord, checked: boolean) => {

        if (record.status === InvoiceStatus.Processing) {
            return;
        }

        if (checked) {
            setSelected(prev => [...prev, record]);
            return;
        }

        setSelected(selected.filter(f => f.schetUid !== record.schetUid));
    }

    const calculateCoordinates = (clientX: number, clientY: number) => {

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = 220;
        const menuHeight = 170;
        const padding = 10;

        let adjustedX = clientX;
        let adjustedY = clientY;

        if (clientX + menuWidth > screenWidth) {
            adjustedX = clientX - menuWidth - padding;
        }

        if (clientY + menuHeight > screenHeight) {
            adjustedY = clientY - menuHeight - padding;
        }

        return { adjustedX, adjustedY };
    }

    const openContextMenu = (e: React.MouseEvent) => {

        e.preventDefault();
        e.stopPropagation();

        if (selected.length === 0) {
            return;
        }

        const { adjustedX, adjustedY } = calculateCoordinates(e.clientX, e.clientY);

        setContextMenu({
            visiable: true,
            poxX: adjustedX,
            posY: adjustedY,
        });

    }

    const closeContextMenu = () => {

        setContextMenu({
            visiable: false,
            poxX: 0,
            posY: 0,
        });

    }

    const sendInvoicesOnMEC = async () => {

        try {

            await api.postWithoutContent('/invoices/logic-control', {
                schetUids: selected.map(item => item.schetUid),
                journalType: journalType
            });

            refreshData();

            toast.success("Счета поставлены в очередь на МЭК!");
        }
        catch {
            toast.error("Произошла ошибка при отправке счетов на МЭК!");
        }
    }

    const removeInvoices = async () => {

        setIsRemoving(true);

        try {

            await api.postWithoutContent('/invoices/remove', {
                schetUids: selected.map(item => item.schetUid),
                journalType: journalType
            });

            refreshData();

            toast.success("Счета удалены!");
        }
        catch {
            toast.error("Произошла ошибка при удаление счетов!");
        }
        finally {
            setIsRemoving(false);
        }
    }

    const downloadReport = async () => {

        setIsDownloading(true);

        try {

            const correctInvoice = selected.filter(item => item.status !== InvoiceStatus.Pending);

            if (correctInvoice.length === 0) {
                toast.warning("Файл ответа доступен только для счетов, прошедших МЭК!");
                return;
            }

            await api.downloadControlValidationReportFile(
                '/report/download-control',
                correctInvoice[0].schetUid,
                journalType
            );

            toast.success("Файл успешно загружен!");
        }
        catch {
            toast.error("Произошла ошибка при скачивание файла ответа МЭК!");
        }
        finally {
            setIsDownloading(false);
        }
    }

    const viewErrors = () => {
        const correctInvoices = selected.filter(item => item.status === InvoiceStatus.LogicControlError);

        if (correctInvoices.length === 0) {
            toast.warning("Выберите счет со статусом \"Ошибки\"!");
            return;
        }

        if (selected.length !== 1) {
            toast.warning("Выберите один счет со статусом  \"Ошибки\"!");
            return;
        }

        window.open(`/errors/${selected[0].schetUid}?journalType=${journalType}`, '_blank');
    }

    useEffect(() => {
        setSelected([])
    }, [pagination?.currentPage, pagination?.pageSize, journalType, data]);

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);

        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    }, [])

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
                        <col style={{ width: '8rem' }} />
                        <col style={{ width: '7rem' }} />
                        <col style={{ width: '6rem' }} />
                        <col style={{ width: '8rem' }} />
                    </colgroup>

                    <thead className={styles.journa_table_head}>
                        <tr>
                            <th>

                                <Checkbox
                                    onChange={selectAllItems}
                                    checked={selected.length === data.filter(item => item.status !== 4).length} />
                            </th>
                            <th>№</th>
                            <th>
                                <div className={styles.thSort}>
                                    Дата загрузки
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('uploade_date')}>
                                        <SortIcon column='uploade_date' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Загрузил
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('uploader')}>
                                        <SortIcon column='uploader' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Имя файла
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('filename')}>
                                        <SortIcon column='filename' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Код МО
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Номер счета
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('nschet')}>
                                        <SortIcon column='nschet' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Дата выставления
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('dschet')}>
                                        <SortIcon column='dschet' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Обработано
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSort}>
                                    Ошибочных
                                </div>
                            </th>
                            <th>
                                <div className={styles.thSortCenter}>
                                    Статус МЭК
                                    <Button
                                        variant='sorting'
                                        fullWidth={false}
                                        onClick={() => handleSort('status_mek')}>
                                        <SortIcon column='status_mek' currentSort={sort} />
                                    </Button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading || isRemoving || isDownloading ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={11} className={styles.loaderCell}>
                                    <DefaultLoader />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={11}>
                                    <span>Данных не найдено</span>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                const hasChecked = selected.includes(item);
                                return (
                                    <tr
                                        key={item.schetUid}
                                        onClick={() => selectItem(item, !hasChecked)}
                                        onContextMenu={(e) => openContextMenu(e)}
                                        className={hasChecked ? styles.selectedRow : ''}
                                    >
                                        <td>
                                            {item.status !== InvoiceStatus.Processing && (
                                                <Checkbox
                                                    checked={hasChecked}
                                                    onChange={(checked) => selectItem(item, checked)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            )}
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
                <LogicControlJournalContextMenu
                    visiable={contextMenu.visiable}
                    posX={contextMenu.poxX}
                    posY={contextMenu.posY}
                    records={selected}
                    sendInvoicesOnMEC={sendInvoicesOnMEC}
                    removeInvoices={removeInvoices}
                    downloadReport={downloadReport}
                    viewErrors={viewErrors} />
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

export default LogicControlJournalTable;