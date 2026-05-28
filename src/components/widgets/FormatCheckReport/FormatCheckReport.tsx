import { useCallback, useEffect, useState } from 'react';
import { InvoiceStatus } from '../../../app/types/InvoiceStatus';
import type { InvoiceSummaryValidationResult } from '../../pages/LogicControlJournal/types';

import Button from '../../ui/Button/Button';
import DefaultLoader from '../../ui/Loaders/DefaultLoader';
import GorizontalSeparator from '../../ui/Seporators/GorizontalSeporator';
import FormatControlJournalContextMenu from '../../ui/ContextMenu/FormatControlJournalContextMenu';

import Status from '../../ui/Status';
import styles from './styles.module.scss';
import { useJournal } from '../../../app/contexts/JournalTypeContext';
import { api } from '../../../shared/api/ApiClient';
import { toast } from 'react-toastify';

interface FormatCheckReportProps {
    isLoading: boolean;
    checkedFiles: InvoiceSummaryValidationResult[];
    uploadInvoices: () => void;
}

const FormatCheckReport = ({
    checkedFiles,
    isLoading,
    uploadInvoices }: FormatCheckReportProps) => {


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

    const successCount = checkedFiles.filter(f => (f.isSuccess && !f.willRewrite)).length;
    const errorCount = checkedFiles.filter(f => (!f.isSuccess && f.errorMessage === '')).length;
    const rewriteCount = checkedFiles.filter(f => f.willRewrite).length;
    const fatalErrorCount = checkedFiles.filter(f => f.errorMessage !== '').length;


    const getStatus = (record: InvoiceSummaryValidationResult): InvoiceStatus => {

        if (record.errorMessage !== '') {
            return InvoiceStatus.NotAllowed;
        }

        if (record.willRewrite) {
            return InvoiceStatus.Rewrite;
        }

        if (record.isSuccess) {
            return InvoiceStatus.Success;
        }

        if (!record.isSuccess) {
            return InvoiceStatus.LogicControlError;
        }

        return InvoiceStatus.Unknown
    }

    const openContextMenu = (e: React.MouseEvent, record: InvoiceSummaryValidationResult) => {

        e.preventDefault();

        if (record.willRewrite || record.errorMessage !== '') {
            return;
        }

        setContextMenu({
            visiable: true,
            posX: e.clientX,
            posY: e.clientY,
            selectedInvoiceFilename: record.uploadArchiveFilename
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

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);
        return () => document.removeEventListener('click', closeContextMenu);
    }, [closeContextMenu]);


    if (isLoading || isDownloading) {
        return (
            <DefaultLoader />
        )
    }

    if (checkedFiles.length === 0) {
        return null;
    }

    return (
        <div className={styles.formatCheckReportRoot}>
            <div className={styles.summary}>

                <div className={styles.summaryInfo}>
                    <p>Результат:</p>
                    {successCount !== 0 && (
                        <span className={styles.spanSuccess}>{successCount}</span>
                    )}

                    {errorCount !== 0 && (
                        <span className={styles.spanError}>{errorCount}</span>
                    )}

                    {rewriteCount !== 0 && (
                        <span className={styles.spanRewrite}>{rewriteCount}</span>
                    )}

                    {fatalErrorCount !== 0 && (
                        <span className={styles.fatalErrorSuccess}>{fatalErrorCount}</span>
                    )}
                </div>

                <Button
                    variant='primary'
                    fullWidth={false}
                    onClick={uploadInvoices}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M14.667 13.667L18 10.333L14.667 7M18 10.333H8.833a3.333 3.333 0 0 0 0 6.667h.834" />
                    </svg>
                    Отправить счета
                </Button>

            </div>

            <GorizontalSeparator size='xs' type='line' />

            <div className={styles.cards}>
                {checkedFiles.map((cf) => (
                    <div className={styles.card}
                        onContextMenu={(e) => openContextMenu(e, cf)}>
                        <div className={styles.general}>
                            <div className={styles.static}>
                                <div className={styles.fileIcon}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="var(--black)"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.75"
                                            d="M13 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V9m-6-6c.286.003.466.014.639.055q.308.075.578.24c.202.124.375.297.72.643l3.126 3.125c.346.346.518.518.642.72q.165.271.24.578c.04.173.051.354.054.639M13 3v2.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h2.802m0 0H19" />
                                    </svg>
                                </div>
                                <div className={styles.fileInfo}>
                                    <span>{cf.uploadArchiveFilename}</span>
                                    <span className={styles.size}>{(cf.fileSize / 1024 / 1024).toFixed(2)} МБ</span>
                                </div>
                            </div>
                            <div className={styles.fileStatus}>
                                <Status status={getStatus(cf)} />
                            </div>
                        </div>
                        {cf.errorMessage !== '' && (
                            <div className={styles.errorOutput}>
                                <span>{cf.errorMessage}</span>
                            </div>
                        )}
                    </div>
                ))}
                <FormatControlJournalContextMenu
                    visiable={conextMenu.visiable}
                    posX={conextMenu.posX}
                    posY={conextMenu.posY}
                    downloadReport={downloadReport}
                    selectedFilename={conextMenu.selectedInvoiceFilename} />
            </div>

        </div>
    )
};

export default FormatCheckReport;