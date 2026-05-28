import type { LogicControlJournalFilters } from '../../../pages/LogicControlJournal/types';

import { useState } from 'react';

import Button from '../../../ui/Button/Button';
import styles from './styles.module.scss';

interface FormatControlJournalFiltersPanelProps {
    resetFilters: () => void;
    setFilters: (filters: LogicControlJournalFilters) => void;
    isApplied: boolean;
}

const FormatControlJournalFiltersPanel = ({
    resetFilters,
    setFilters,
    isApplied
}: FormatControlJournalFiltersPanelProps) => {

    const [filterInputValue, setFilterInputValue] = useState<string>('');

    const clearFilters = () => {
        setFilterInputValue('');
        resetFilters();
    };

    const applyFilters = () => {

        setFilters({
            globalFilterTarget: filterInputValue,
        });

    };

    return (
        <div className={styles.journalFiltersPanelRoot}>
            <div className={styles.filters}>
                <div className={`${styles.filter} ${isApplied ? styles.applied : ''}`}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>

                    <input
                        value={filterInputValue}
                        onChange={(e) => setFilterInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                applyFilters();
                            }
                        }}
                        placeholder='Поиск по чему угодно' />
                </div>
            </div>
            <div className={styles.actions}>
                <Button
                    variant='secondary'
                    fullWidth={false}
                    onClick={clearFilters}
                    disabled={!isApplied}>
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
                            stroke={isApplied ? 'var(--black)' : 'var(--gray-300'}
                            stroke-width="1.5" />
                    </svg>
                    Сбросить фильтры
                </Button>
            </div>
        </div>
    )
};

export default FormatControlJournalFiltersPanel;