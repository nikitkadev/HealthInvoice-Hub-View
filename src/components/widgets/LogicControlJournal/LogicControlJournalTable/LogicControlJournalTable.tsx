import type { JournalRecord } from '../../../app_lk_journal/general/JournalData';
import { useJournal } from '../../../app_lk_journal/general/JournalContext';
import React, { useEffect, useState } from 'react';
import LogicControlJournalContextMenu from '../../../ui/ConextMenu/LogicControlJournalContextMenu';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import Loader from '../../../ui/Loader';
import Pagination from '../../../ui/Pagination';
import Status from '../../../ui/Status';
import Checkbox from '../../../ui/Checkbox';
import { InvoiceStatus } from '../../../../app/types/InvoiceStatus';

interface LogicControlJournalTableProps {
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

const LogicControlJournalTable = ({
    pagination,
    data,
    isLoading,
    goToPage,
    setPageSize
}: LogicControlJournalTableProps) => {

    const [selected, setSelected] = useState<JournalRecord[]>([]);
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

    const selectItem = (record: JournalRecord, checked: boolean) => {

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

    useEffect(() => {
        setSelected([])
    }, [pagination?.currentPage, pagination?.pageSize, journalType, data]);

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);

        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    })

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
                                    checked={selected.length === data.filter(item => item.status !== 4).length} />
                            </th>
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
                                        onContextMenu={(e) => openContextMenu(e)}
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
                    records={selected} />
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