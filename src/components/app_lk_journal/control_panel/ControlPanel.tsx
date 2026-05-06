import { JournalToggle } from '../../../shared/ui/toggle/JournalToggle';
import { useJournal } from '../../app_lk_journal/general/JournalContext';
import styles from './ControlPanel.module.css';
import { Pagination } from '../../../shared/ui/pagination/Pagination';
import { Separator } from '../../../shared/ui/seporator/Separator';
import { LogicControlJournalFilters } from '../../../shared/ui/filters/LogicControlJournalFilters';

interface ControlPanelProps {
    onFkJournalOpen: () => void;
    onUpload: () => void;
    onRefresh: () => void;
    goToPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    isAdmin: boolean;
    pagination?: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
    };
    filters: {
        organizationCode: string;
        schetNumber: string;
        username: string;
        filename: string;
        dateFrom: string;
        dateTo: string;
    };
    onFilterChange: (updater: (prev: any) => any) => void;
    onApply: () => void;
    onReset: () => void;
}

export const ControlPanel = ({
    filters,
    onFilterChange,
    onApply,
    onReset,
    onFkJournalOpen,
    onRefresh,
    onUpload,
    pagination,
    goToPage,
    setPageSize,
    isAdmin
}: ControlPanelProps) => {

    const {
        journalType,
        setJournalType } = useJournal();

    return (
        <div className={styles.container}>
            <div className={styles.container_info}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <p className={styles.p}>
                        Журнал реестров:
                    </p>
                    <JournalToggle
                        value={journalType}
                        onChange={setJournalType} />
                    <Separator type='line' orientation='vertical' size='xs' color="var(--border-light)" />
                    <Pagination
                        currentPage={pagination?.currentPage ?? 1}
                        totalPages={pagination?.totalPages ?? 1}
                        pageSize={pagination?.pageSize ?? 50}
                        totalItems={pagination?.totalItems ?? 0}
                        onPageChange={goToPage}
                        onPageSizeChange={setPageSize}
                    />
                    {isAdmin && (
                        <>
                            <Separator type='line' orientation='vertical' size='xs' color="var(--border-light)" />
                            <LogicControlJournalFilters
                                filters={filters}
                                onApply={onApply}
                                onReset={onReset}
                                onFilterChange={onFilterChange} />
                        </>
                    )}
                </div>
            </div>

            <div className={styles.container_action}>
                <button
                    className={styles.button_with_text_and_icon}
                    onClick={onFkJournalOpen}
                >
                    Журнал ФК
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <title>Chevron-down SVG Icon</title>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m7 10l4.859 4.859a.2.2 0 0 0 .282 0L17 10" />
                    </svg>
                </button>
                <button
                    className={styles.button_with_text_and_icon}
                    onClick={onUpload}>
                    Загрузить
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M12 7v5m0 5v-5m5 0h-5m0 0H7" />
                    </svg>
                </button>
                <Separator type='line' orientation='vertical' size='xs' color="var(--border-light)" />
                <button
                    className={styles.button_icon_only}
                    onClick={onRefresh}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <g fill="none">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.217 5.333a1 1 0 1 1-1.49 1.334A5 5 0 0 0 7 10h2a1 1 0 0 1 .707 1.707l-3 3a1 1 0 0 1-1.414 0l-3-3A1 1 0 0 1 3 10h2a7 7 0 0 1 12.217-4.667zm4.49 6.96A1 1 0 0 1 21 14h-2v.002a7 7 0 0 1-12.217 4.665a1 1 0 1 1 1.49-1.334A5 5 0 0 0 17 14h-2a1 1 0 0 1-.707-1.707l3-3a1 1 0 0 1 1.414 0l3 3z"
                                fill="#000000" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    )
}