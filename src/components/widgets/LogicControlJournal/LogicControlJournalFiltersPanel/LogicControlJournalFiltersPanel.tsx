import type { JournalFilters } from '../../../app_lk_journal/general/JournalData';

import { useState } from 'react';

import Button from '../../../ui/Button/Button';
import styles from './styles.module.scss';

interface LogicControlJournalFiltersPanelProps {
    resetFilters: () => void;
    setFilters: (filters: JournalFilters) => void;
}

const LogicControlJournalFiltersPanel = ({
    resetFilters,
    setFilters
}: LogicControlJournalFiltersPanelProps) => {

    const [localCodeMo, setLocalCodeMo] = useState<string>('');
    const [localNSchet, setLocalNSchet] = useState<string>('');
    const [localFilename, setLocalFilename] = useState<string>('');

    const clearFilters = () => {
        setLocalCodeMo('');
        setLocalNSchet('');
        setLocalFilename('');
        resetFilters();
    };

    const applyFilters = () => {

        setFilters({
            organizationCode: localCodeMo,
            schetNumber: localNSchet,
            filename: localFilename
        });
    };

    return (
        <div className={styles.journalFiltersPanelRoot}>
            <div className={styles.filters}>

                <div className={styles.filter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>
                    <input
                        value={localCodeMo}
                        onChange={(e) => setLocalCodeMo(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                applyFilters();
                            }
                        }}
                        placeholder='Поиск по коду МО' />
                </div>

                <div className={styles.filter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>
                    <input
                        value={localFilename}
                        onChange={(e) => setLocalFilename(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                applyFilters();
                            }
                        }}
                        placeholder='Поиск имени файла' />
                </div>

                <div className={styles.filter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>
                    <input
                        value={localNSchet}
                        onChange={(e) => setLocalNSchet(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                applyFilters();
                            }
                        }}
                        placeholder='Поиск номеру счета' />
                </div>

            </div>
            <div className={styles.actions}>
                <Button
                    variant='secondary'
                    fullWidth={false}
                    onClick={clearFilters}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" fill="none" stroke="var(--black)" stroke-width="2" />
                    </svg>
                    Отчистить фильтры
                </Button>
            </div>
        </div>
    )
};

export default LogicControlJournalFiltersPanel;