import React, { useEffect, useState } from 'react'
import styles from './LogicControlJournalFilters.module.css'
import { Separator } from '../seporator/Separator';

const EMPTY_FILTERS = {
    organizationCode: '',
    schetNumber: '',
    username: '',
    filename: '',
    dateFrom: '',
    dateTo: ''
}

export const LogicControlJournalFilters = ({
    filters: externalFilters,
    onFilterChange,
    onApply,
    onReset
}: {
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
}) => {

    const [filtersMenu, setFiltersMenu] = useState<{
        visible: boolean,
        posX: number,
        posY: number
    }>({ visible: false, posX: 0, posY: 0 });

    const [localFilters, setLocalFilters] = useState(externalFilters);

    useEffect(() => {
        if (filtersMenu.visible) {
            setLocalFilters(externalFilters);
        }
    }, [filtersMenu.visible, externalFilters]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isButton = target.closest(`.${styles.button}`);
            const isMenu = target.closest(`.${styles.filters_container}`);

            if (!isButton && !isMenu) {
                closeFilterMenu();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeFilterMenu();
            }
        };

        if (filtersMenu.visible) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [filtersMenu.visible]);

    const handleLocalFilterChange = (field: keyof typeof EMPTY_FILTERS, value: string) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const openFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFiltersMenu({
            visible: true,
            posX: e.clientX,
            posY: e.clientY
        })
    }

    const closeFilterMenu = () => {
        setFiltersMenu(prev => ({
            ...prev, visible: false
        }));
    }

    const handleApply = () => {
        onFilterChange(() => localFilters);
        onApply();
        closeFilterMenu();
    };

    const handleReset = () => {
        setLocalFilters(EMPTY_FILTERS);
        onReset();
        closeFilterMenu();
    };

    return (
        <>
            <button
                onClick={openFilters}
                className={styles.button}>
                Поиск по фильтрам
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                    <title>Search SVG Icon</title>
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="10.5" cy="10.5" r="5.5" />
                        <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                    </g>
                </svg>
            </button>
            {filtersMenu.visible && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        top: filtersMenu.posY,
                        left: filtersMenu.posX - 100
                    }}
                    className={styles.filters_container}>
                    <span>Великая фильтрация</span>
                    <div className={styles.filter_line}>
                        <div className={styles.label_with_input}>
                            <label>Код МО</label>
                            <input
                                value={localFilters.organizationCode}
                                onChange={(e) => handleLocalFilterChange('organizationCode', e.target.value)}
                                placeholder='190001'
                            />
                        </div>
                        <div className={styles.label_with_input}>
                            <label>Номер счета</label>
                            <input
                                value={localFilters.schetNumber}
                                onChange={(e) => handleLocalFilterChange('schetNumber', e.target.value)}
                                placeholder='100'
                            />
                        </div>
                    </div>
                    <div className={styles.filter_line}>
                        <div className={styles.label_with_input}>
                            <label>Имя пользователя</label>
                            <input
                                value={localFilters.username}
                                onChange={(e) => handleLocalFilterChange('username', e.target.value)}
                                placeholder='nikitka@gmail.com'
                            />
                        </div>
                    </div>
                    <div className={styles.filter_line}>
                        <div className={styles.label_with_input}>
                            <label>Имя файла</label>
                            <input
                                value={localFilters.filename}
                                onChange={(e) => handleLocalFilterChange('filename', e.target.value)}
                                placeholder='HM19000S19000_010100'
                            />
                        </div>
                    </div>
                    {/* <div className={styles.filter_line}>
                        <div className={styles.label_with_input}>
                            <label>Дата от</label>
                            <input
                                type="date"
                                value={localFilters.dateFrom}
                                onChange={(e) => handleLocalFilterChange('dateFrom', e.target.value)}
                            />
                        </div>
                        <div className={styles.label_with_input}>
                            <label>Дата до</label>
                            <input
                                type="date"
                                value={localFilters.dateTo}
                                onChange={(e) => handleLocalFilterChange('dateTo', e.target.value)}
                            />
                        </div>
                    </div> */}
                    <Separator size='xs' orientation='horizontal' type='line' color='var(--app-background)' />
                    <div className={styles.buttons_container}>
                        <button
                            className={styles.button_reset}
                            onClick={handleReset}>
                            Сбросить
                        </button>
                        <button onClick={handleApply}>
                            Применить
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}