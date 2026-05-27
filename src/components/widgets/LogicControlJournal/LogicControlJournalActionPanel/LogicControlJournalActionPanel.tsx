import type { InvoiceSummaryValidationResult } from '../../../pages/LogicControlJournal/types';

import { api } from '../../../../shared/api/ApiClient';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useJournal } from '../../../../app/contexts/JournalTypeContext';
import { ZipDropped } from '../../../ui/ZIpDropped/ZipDropped';

import Button from '../../../ui/Button/Button';
import Drawer from '../../../ui/Drawer';
import styles from './styles.module.scss';
import FormatCheckReport from '../../FormatCheckReport';
import JournalTypeToggle from '../../../ui/JournalTypeToggle';

interface LogicControlJournalActionPanellProps {
    refreshData: () => void;
}

const LogicControlJournalActionPanel = ({
    refreshData
}: LogicControlJournalActionPanellProps) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedFiles, setCheckedFiles] = useState<InvoiceSummaryValidationResult[]>([]);
    const { journalType, setJournalType } = useJournal();

    const openDrawer = () => {
        setCheckedFiles([]);
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setCheckedFiles([]);
        setIsDrawerOpen(false);
    }

    const handleFilesDropped = async (files: File[]) => {

        setIsLoading(true);

        try {
            const formData = new FormData();

            formData.append('journalType', journalType.toString());

            files.forEach(file => {
                formData.append('files', file);
            });

            const response = await api.postFormData<InvoiceSummaryValidationResult[]>(
                '/invoices/format-control',
                formData
            );

            setCheckedFiles(response);
        }
        catch {

        }
        finally {
            setIsLoading(false);
        }
    }

    const uploadInvoices = async () => {

        setIsLoading(true);

        try {

            const filesToSend = checkedFiles
                .filter(file => file.isSuccess)
                .map(file => ({
                    filename: file.uploadArchiveFilename,
                    filePath: file.uploadArchiveFilePath,
                    schetUid: file.schetUid
                }));

            if (filesToSend.length === 0) {
                toast.warning("Нет валидных счетов для записи в базу данных!");
                return;
            }

            await api.postWithoutContent('/invoices/upsert', {
                items: filesToSend,
                journalType: journalType
            });

            closeDrawer();

            toast.success("Счета отправлены!");
        }
        catch {
            toast.error("Технические шоколадки!");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.journalPanelRoot}>
            <div className={styles.action}>
                <div className={styles.toggle}>
                    <p>Тип журнала:</p>
                    <JournalTypeToggle
                        value={journalType}
                        onChange={setJournalType} />
                </div>
                <div className={styles.buttons}>

                    <Button
                        variant='secondary'
                        fullWidth={false}
                        onClick={refreshData}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--black)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M14 16h5v5M10 8H5V3m14.418 6.003A8 8 0 0 0 5.086 7.976m-.504 7.021a8 8 0 0 0 14.331 1.027" />
                        </svg>
                        Обновить журнал
                    </Button>

                    <Button
                        variant='primary'
                        fullWidth={false}
                        onClick={openDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--white)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 12h6m0 0h6m-6 0v6m0-6V6" />
                        </svg>
                        Добавить счета
                    </Button>
                </div>
            </div>
            <Drawer
                title='Окно загрузки счетов'
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
            >
                <ZipDropped
                    onFilesDropped={handleFilesDropped}
                    isLoading={isLoading} />

                <FormatCheckReport
                    checkedFiles={checkedFiles}
                    isLoading={isLoading}
                    uploadInvoices={uploadInvoices} />

            </Drawer>
        </div>
    )
};

export default LogicControlJournalActionPanel;