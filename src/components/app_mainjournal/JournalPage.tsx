import type { InvoiceSummaryValidationResult } from './UploadJournalTypes';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../shared/ui/checkbox/Checkbox';
import { LoaderBlock } from '../../shared/ui/loader/LoaderBlock';
import { Status } from '../../shared/ui/status/Status';
import { ControlPanel } from './ControlPanel';
import { useJournalData, type JournalRecord } from './JournalData';
import { toast } from 'react-toastify';
import { Modal } from '../../shared/ui/modal/Modal';
import { ZipDropped } from '../../shared/ui/dropped/Zip/ZipDropped';
import { api } from '../../shared/api/ApiClient';
import { useJournal } from './JournalContext';
import dayjs from 'dayjs';
import styles from './JournalPage.module.css';
import { FkJournalPage } from '../app_fk_journal/FkJournalPage';
import { Separator } from '../../shared/ui/seporator/Separator';

export const JournalPage = () => {
    const [rowContextMenu, setRowContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        schetUid: number;
        status: number;
        invoiceName: string;
    }>({ visible: false, x: 0, y: 0, schetUid: 0, status: 0, invoiceName: "default_name" });

    const [tableContextMenu, setTableContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
    }>({ visible: false, x: 0, y: 0 });

    const { journalType } = useJournal();
    const {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize,
        refreshData
    } = useJournalData();

    const [checkedInvoices, setCheckedInvoices] = useState<InvoiceSummaryValidationResult[]>([]);
    const [selected, setSelected] = useState<JournalRecord[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isFkJournalModalOpen, setIsFkJournalModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [wasSent, setWasSent] = useState(false);

    useEffect(() => {
        setSelected([])
    }, [pagination?.currentPage, pagination?.pageSize, journalType])

    const getAdjustedPosition = (x: number, y: number, menuWidth: number, menuHeight: number) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let adjustedX = x;
        let adjustedY = y;

        if (x + menuWidth > viewportWidth) {
            adjustedX = viewportWidth - menuWidth - 10;
        }

        if (y + menuHeight > viewportHeight) {
            adjustedY = viewportHeight - menuHeight - 10;
        }

        return { x: adjustedX, y: adjustedY };
    };

    const handleRowContextMenu = (e: React.MouseEvent, schetUid: number, status: number, invoiceName: string) => {
        closeTableContextMenu();
        e.preventDefault();
        e.stopPropagation();

        const menuWidth = 250;
        const menuHeight = 280;

        const { x, y } = getAdjustedPosition(e.clientX, e.clientY, menuWidth, menuHeight);

        setRowContextMenu({
            visible: true,
            x: x,
            y: y,
            schetUid,
            status,
            invoiceName
        });
    };

    const handleTableContextMenu = (e: React.MouseEvent) => {
        closeRowContextMenu();
        e.preventDefault();
        setTableContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY
        })
    }

    const closeRowContextMenu = () => {
        setRowContextMenu(prev => ({ ...prev, visible: false }));
    };

    const closeTableContextMenu = () => {
        setTableContextMenu(prev => ({ ...prev, visible: false }));
    }

    useEffect(() => {
        const isAnyMenuVisible = rowContextMenu.visible || tableContextMenu.visible;

        const handleClickOutside = () => {
            closeRowContextMenu();
            closeTableContextMenu();
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeRowContextMenu();
                closeTableContextMenu();
            };
        };

        if (isAnyMenuVisible) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [rowContextMenu.visible, tableContextMenu.visible]);


    const cleanUpTempFile = async () => {
        if (checkedInvoices.length === 0) {
            return;
        }

        const filesToRemove = checkedInvoices
            .filter(f => f.uploadArchiveFilePath)
            .map(m => ({
                filename: m.uploadArchiveFilename,
                filePath: m.uploadArchiveFilePath
            }));

        if (filesToRemove.length === 0) {
            return;
        }
        try {

            await api.post('/file/remove', { FilesToRemove: filesToRemove });
        }
        catch (error) {
            console.debug(error)
        }
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const selectable = data
                .filter(item => item.status !== 4);

            setSelected(selectable);
        } else {
            setSelected([]);
        }
    };

    const handleSelect = (record: JournalRecord, checked: boolean) => {
        if (checked) {
            setSelected([...selected, record]);
        } else {
            setSelected(selected.filter(item => item.schetUid !== record.schetUid));
        }
    };

    const handleRefresh = () => {
        try {
            setSelected([]);
            closeTableContextMenu();
            refreshData();
        }
        catch {
            toast.error("Внутренняя ошибка сервера")
        }
    };

    const handleRemoving = async () => {
        setIsRemoving(true);
        try {
            await api.post('/invoices/remove', {
                schetUids: selected,
                journalType: journalType
            });

            setSelected([]);
            refreshData();
            toast.success("Выбранные счета успешно удалены!");
        }
        catch (error) {
            toast.error("Внутренняя ошибка.. Обратитесь к разработчику!");
        }
        finally {
            setIsRemoving(false);
        }
    }

    const handleRemovingOneItemContextMenuButton = async () => {
        setIsRemoving(true);

        try {
            const schetUids: number[] = [];
            schetUids.push(rowContextMenu.schetUid);

            await api.post('/invoices/remove', {
                schetUids: schetUids,
                journalType: journalType
            });

            refreshData();
            toast.success("Выбранные счета успешно удалены!");
        }
        catch {
            toast.error("Внутренняя ошибка.. Обратитесь к разработчику!");
        }
        finally {
            setIsRemoving(false);
        }
    }

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        setWasSent(false);
    };

    const handleUpload = async (files: File[]) => {

        setIsUploading(true);

        try {

            const formData = new FormData();

            formData.append('journalType', journalType.toString());
            files.forEach(file => {
                formData.append('files', file);
            });

            const response = await api.postFormData<InvoiceSummaryValidationResult[]>(
                '/invoices/format-control',
                formData);

            if (!response) {
                return;
            }

            setCheckedInvoices(response);

        } catch (error) {
            toast.error("Произошла ошибка при проверке файлов...");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCloseUploadModal = () => {

        if (!wasSent) {
            cleanUpTempFile();
        }

        setIsUploadModalOpen(false);
        setCheckedInvoices([]);
    };

    const handleCloseFkJournalModal = () => {
        setIsFkJournalModalOpen(false);
    }

    const handleOpenJournalFkModal = () => {
        setIsFkJournalModalOpen(true);
    }

    const handleSendInvoicesInDbButton = async () => {
        try {
            const filesToSend = checkedInvoices
                .filter(file => file.isSuccess)
                .map(file => ({
                    filename: file.uploadArchiveFilename,
                    filePath: file.uploadArchiveFilePath,
                    schetUid: file.schetUid
                }));

            if (filesToSend.length === 0) {
                toast.warning('Нет успешных файлов для отправки');
                return;
            }

            await api.post('/invoices/upsert', {
                items: filesToSend,
                journalType: journalType
            });

            toast.success('Файлы успешно отправлены в ТФОМС РХ');

            setWasSent(true);
            setIsUploadModalOpen(false);
            setCheckedInvoices([]);

        } catch (error) {
            toast.error("Произошла ошибка при отправке");
        }
    };

    const handleLogicalControlButton = async () => {

        setIsSending(true);

        try {
            await api.post('/invoices/logic-control', {
                schetUids: selected,
                journalType: journalType
            });
            setSelected([]);
            refreshData();
            toast.success("Выбранные счета успешно отправлена на МЭК!");
        }
        catch (error) {
            toast.error("Произошал ошибка отправки счетов на МЭК");
        }
        finally {
            setIsSending(false);
        }
    }

    const handlerLogicControlButtonSoloRecord = async () => {
        setIsSending(true);

        try {
            const schetUids: number[] = [];
            schetUids.push(rowContextMenu.schetUid);

            await api.post('/invoices/logic-control', {
                schetUids: schetUids,
                journalType: journalType
            });

            refreshData();
            toast.success("Выбранные счета успешно удалены!");
        }
        catch {
            toast.error("Внутренняя ошибка.. Обратитесь к разработчику!");
        }
        finally {
            setIsSending(false);
        }
    }

    const handleRowClick = (errorMessage: string) => {
        toast.error(errorMessage);
    };

    const handleSelectRow = (record: JournalRecord) => {
        if (record.status === 4) return;

        const isCurrentlySelected = selected.includes(record);
        if (isCurrentlySelected) {
            setSelected(selected.filter(item => item !== record));
        } else {
            setSelected([...selected, record]);
        }
    };

    const downloadLogicControlReport = async (schetUid: number) => {
        try {
            await api.downloadControlValidationReportFile('/report/download-control', schetUid, journalType);
            toast.success("Отчет успешно загружен");
        }
        catch {

        }
    }

    if (isLoading) {
        return <LoaderBlock text='Накидываем Голгороту...' />
    }

    const hasSuccess = checkedInvoices.some(f => f.isSuccess || f.willRewrite);
    const buttonClass = `${styles.button} ${hasSuccess ? styles.active : styles.disabled}`;
    const writting = checkedInvoices.filter(f => f.isSuccess && !f.willRewrite).length;
    const rewritting = checkedInvoices.filter(f => f.willRewrite).length;
    const notwritting = checkedInvoices.filter(f => !f.isSuccess && f.errorMessage.length == 0).length;
    const meta_nonwritting = checkedInvoices.filter(f => f.errorMessage.length > 0).length;
    const selectedCount = selected.length;


    return (
        <>
            <ControlPanel
                onFkJournalOpen={handleOpenJournalFkModal}
                onRefresh={handleRefresh}
                onUpload={handleUploadClick}
                goToPage={goToPage}
                pagination={pagination}
                setPageSize={setPageSize} />
            <div
                className={styles.container}
                onContextMenu={(e) => handleTableContextMenu(e)}>
                <div
                    className={styles.table_container}>

                    {(isSending || isRemoving) ? (
                        <div className={styles.loaderWrapper}>
                            <LoaderBlock text='Дамажим Варприста с гробов...' />
                        </div>
                    ) : (
                        <table className={styles.journal_table}>
                            <colgroup>
                                <col style={{ width: '2.5rem' }} />
                                <col style={{ width: '2.5rem' }} />
                                <col style={{ width: '8rem' }} />
                                <col style={{ width: '12rem' }} />
                                <col style={{ width: '11rem' }} />
                                <col style={{ width: '5rem' }} />
                                <col style={{ width: '8rem' }} />
                                <col style={{ width: '10rem' }} />
                                <col style={{ width: '7rem' }} />
                                <col style={{ width: '7rem' }} />
                                <col style={{ width: '8rem' }} />
                                <col style={{ width: '2rem' }} />
                            </colgroup>
                            <thead className={styles.journa_table_head}>
                                <tr className={styles.tr}>
                                    <th className={styles.th}>
                                        <Checkbox
                                            checked={selected.length === data.filter(item => item.status !== 4).length}
                                            onChange={handleSelectAll} />
                                    </th>
                                    <th className={styles.th}>№</th>
                                    <th className={styles.th}>Дата загрузки</th>
                                    <th className={styles.th}>Загрузил</th>
                                    <th className={styles.th}>Имя файла</th>
                                    <th className={styles.th}>Код МО</th>
                                    <th className={styles.th}>Номер счета</th>
                                    <th className={styles.th}>Дата выставления счета</th>
                                    <th className={styles.th}>Обработано записей</th>
                                    <th className={styles.th}>Ошибочных записей</th>
                                    <th className={styles.thCenter}>Статус МЭК</th>
                                    <th className={styles.th}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    const isChecked = selected.includes(item);

                                    return (
                                        <tr
                                            key={item.schetUid}
                                            className={`${styles.tr_body} ${isChecked ? styles.trSelected : ''}`}
                                            onClick={() => handleSelectRow(item)}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onContextMenu={(e) => handleRowContextMenu(e, item.schetUid, item.status, item.fileName)}
                                        >
                                            <td className={styles.td}
                                                style={{
                                                    padding: '0'
                                                }}>
                                                {item.status !== 4 && (
                                                    <Checkbox
                                                        checked={selected.includes(item)}
                                                        onChange={(checked) => handleSelect(item, checked)}
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
                                            <td className={styles.tdCenter}>
                                                {item.status === 1 && <Status text='Успешно' type='success' />}
                                                {item.status === 2 && <Status text='Не проведен' type='waiting' />}
                                                {item.status === 4 && <Status text='В процессе' type='processing' />}
                                                {item.status === -1 && <Status text='Ошибки' type='error' />}
                                                {item.status === -2 && <Status text='Сбой' type='fatal-error' />}
                                            </td>
                                            <td className={styles.td}></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                    {(rowContextMenu.visible && rowContextMenu.status !== 4) && (
                        <div
                            className={styles.contextMenu}
                            style={{ top: rowContextMenu.y, left: rowContextMenu.x }}
                        >
                            <>
                                {selectedCount === 0 ? (
                                    <div className={styles.context_menu_header}>Счет {rowContextMenu.invoiceName}</div>
                                ) : (
                                    <div className={styles.context_menu_header}>Выбрано счетов: {selectedCount}</div>
                                )}

                                {(selectedCount === 0 && (rowContextMenu.status === -1 || rowContextMenu.status === 1)) && (
                                    <button onClick={() => downloadLogicControlReport(rowContextMenu.schetUid)}>
                                        Скачать ответ МЭК
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
                                )}

                                {(selectedCount === 1 && (selected[0].status === -1 || selected[0].status === 1)) && (
                                    <button onClick={() => downloadLogicControlReport(selected[0].schetUid)}>
                                        Скачать ответ МЭК
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
                                )}

                                {selectedCount === 0 ? (
                                    <button onClick={handlerLogicControlButtonSoloRecord}>
                                        {rowContextMenu.status === 2 ? (
                                            <div>Провести МЭК</div>
                                        ) : (
                                            <div>Повторить МЭК</div>
                                        )}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1"
                                                d="M14.667 13.667L18 10.333L14.667 7M18 10.333H8.833a3.333 3.333 0 0 0 0 6.667h.834" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button onClick={handleLogicalControlButton}>
                                        Выполнить МЭК
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1"
                                                d="M14.667 13.667L18 10.333L14.667 7M18 10.333H8.833a3.333 3.333 0 0 0 0 6.667h.834" />
                                        </svg>
                                    </button>
                                )}



                                <Separator type='line' orientation='horizontal' size='xs' color="var(--border-light-menu-context)" />

                                {(selectedCount === 0 && rowContextMenu.status === -1) && (
                                    <button onClick={() => console.log("Пук")}>
                                        Просмотреть ошибки
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1"
                                                d="m9 8l-4 4l4 4m6-8l4 4l-4 4" />
                                        </svg>
                                    </button>
                                )}

                                {selectedCount === 0 ? (
                                    <button onClick={handleRemovingOneItemContextMenuButton}
                                        style={{
                                            color: 'var(--journal-smo-error-status)',
                                            fontWeight: '500'
                                        }}>
                                        Удалить счет
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="var(--journal-smo-error-status)"
                                                stroke-linecap="round"
                                                stroke-width="1.5"
                                                d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button onClick={handleRemoving}
                                        style={{
                                            color: 'var(--journal-smo-error-status)',
                                            fontWeight: '500'
                                        }}>
                                        Удалить счета
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="none"
                                                stroke="var(--journal-smo-error-status)"
                                                stroke-linecap="round"
                                                stroke-width="1.5"
                                                d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" />
                                        </svg>
                                    </button>
                                )}


                            </>
                        </div>
                    )}
                    {(tableContextMenu.visible && (
                        <div
                            className={styles.contextMenu}
                            style={{ top: tableContextMenu.y, left: tableContextMenu.x }}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onContextMenu={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        >
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleRefresh();
                            }}>
                                Обновить журнал
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="4"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div >
            <Modal
                isOpen={isUploadModalOpen}
                onClose={handleCloseUploadModal}
                title='Окно загрузки счетов'>
                <ZipDropped
                    onFilesDropped={handleUpload}
                    isLoading={isUploading} />
                <div className={styles.modal_table_container}>
                    {isUploading ? (
                        <LoaderBlock text="Хоум-ранним счета на серверную проверку..." size='small' />
                    ) : (
                        <table className={styles.modal_table}>
                            <colgroup>
                                <col style={{ width: '1rem' }} />
                                <col style={{ width: '5rem' }} />
                                <col style={{ width: '4rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '.5rem' }} />
                            </colgroup>
                            <thead className={styles.journa_table_head}>
                                <tr className={styles.tr}>
                                    <th className={styles.th}>№</th>
                                    <th className={styles.th}>Имя файла</th>
                                    <th className={styles.th}>Размер (КБ)</th>
                                    <th className={styles.thCenter}>Статус ФК</th>
                                    <th className={styles.thCenter}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkedInvoices.map((item, index) => {
                                    const isMetaError = item.errorMessage.length > 0;
                                    return (
                                        <tr
                                            className={`${styles.tr} ${isMetaError ? styles.clickable : ''}`}
                                            onClick={(isMetaError) ? () => handleRowClick(item.errorMessage) : undefined}>
                                            <td className={styles.td}>{index + 1}</td>
                                            <td className={styles.td}>{item.uploadArchiveFilename}</td>
                                            <td className={styles.td}>{Math.round(item.fileSize / 1024)}</td>
                                            <td className={styles.tdCenter} style={{
                                                width: '10rem'
                                            }}>
                                                {item.isSuccess ? (
                                                    <Status
                                                        text={item.willRewrite ? 'Перезапись' : 'Успешно'}
                                                        type={item.willRewrite ? 'rewriting' : 'success'} />
                                                ) : (
                                                    <Status
                                                        text={isMetaError ? 'Не допущен' : 'Ошибки'}
                                                        type={isMetaError ? 'meta-error' : 'error'} />
                                                )}
                                            </td>
                                            <td className={styles.td}></td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className={styles.modal_footer}>
                    {!isUploading && checkedInvoices.length > 0 && (
                        <div className={styles.footer_result_card}>
                            <div className={styles.summary_card}>
                                {writting > 0 && (
                                    <div className={styles.card_info_block_write}>
                                        <label className={styles.label_write}>Запись</label>
                                        <p className={styles.p}>{writting}</p>
                                    </div>
                                )}
                                {rewritting > 0 && (
                                    <div className={styles.card_info_block_rewrite}>
                                        <label className={styles.label_rewrite}>Перезапись</label>
                                        <p className={styles.p}>{rewritting}</p>
                                    </div>
                                )}
                                {notwritting > 0 && (
                                    <div className={styles.card_info_block_fail}>
                                        <label className={styles.label_fail}>С ошибками</label>
                                        <p className={styles.p}>{notwritting}</p>
                                    </div>
                                )}
                                {meta_nonwritting > 0 && (
                                    <div className={styles.card_info_block_no_access}>
                                        <label className={styles.label_no_access}>Не допущен</label>
                                        <p className={styles.p}>{meta_nonwritting}</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className={buttonClass}
                                disabled={!hasSuccess}
                                onClick={handleSendInvoicesInDbButton}>
                                Отправить
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <title>Direction-up-right SVG Icon</title>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.883 15.833l3.334-3.333m0 0l-3.334-3.333m3.334 3.333H10.05a3.333 3.333 0 0 0-3.333 3.333" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
            <Modal
                size='large'
                isOpen={isFkJournalModalOpen}
                title='Журнал форматного контроля'
                onClose={handleCloseFkJournalModal} >
                <FkJournalPage />
            </Modal>
        </>
    )
}