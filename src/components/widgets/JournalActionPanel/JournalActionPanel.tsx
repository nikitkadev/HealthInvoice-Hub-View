import type { InvoiceSummaryValidationResult } from '../../app_lk_journal/general/UploadJournalTypes';
import { useState } from 'react';
import { useJournal } from '../../app_lk_journal/general/JournalContext';
import { api } from '../../../shared/api/ApiClient';
import { ZipDropped } from '../../ui/ZIpDropped/ZipDropped';
import Button from '../../ui/Button/Button';
import Drawer from '../../ui/Drawer';
import JournalTypeToggle from '../../ui/JournalTypeToggle';
import styles from './styles.module.scss';
import FormatCheckReport from '../FormatCheckReport';

interface JournalActionPanelProps {
    refreshData: () => void;
}

const JournalActionPanel = ({
    refreshData
}: JournalActionPanelProps) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFormatCheck, setIsFormatCheck] = useState(false);
    const [checkedFiles, setIsCheckedFiles] = useState<InvoiceSummaryValidationResult[]>([]);
    const { journalType, setJournalType } = useJournal();

    const openDrawer = () => {
        setIsCheckedFiles([]);
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsCheckedFiles([]);
        setIsDrawerOpen(false);
    }

    const handleFilesDropped = async (files: File[]) => {

        setIsFormatCheck(true);

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

            setIsCheckedFiles(response);
        }
        catch {

        }
        finally {
            setIsFormatCheck(false);
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
                    isLoading={isFormatCheck} />

                <FormatCheckReport
                    checkedFiles={checkedFiles}
                    isFormatCheck={isFormatCheck} />

            </Drawer>
        </div>
    )
};

export default JournalActionPanel;