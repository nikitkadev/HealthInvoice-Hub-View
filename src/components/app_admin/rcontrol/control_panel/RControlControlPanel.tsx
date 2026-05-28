import { useJournal } from '../../../../app/contexts/JournalTypeContext';
import { useEffect, useState } from 'react';

import styles from './RControlControlPanel.module.css'
import Select from 'react-select';
import { api } from '../../../../shared/api/ApiClient';

export interface MedOrganization {
    code: string;
    name: string;
}

interface Period {
    year: number;
    month: number;
}

interface ControlPanelProps {
    onApplyFilters: (codeMo: string, year: string, month: string) => void;
}

export const RControlControlPanel = ({ onApplyFilters }: ControlPanelProps) => {
    const [organizations, setOrganizations] = useState<MedOrganization[]>([]);
    const [periods, setPeriods] = useState<Period[]>([]);

    const [selectedOrg, setSelectedOrg] = useState<{ value: string; label: string } | null>(null);
    const [selectedYear, setSelectedYear] = useState<{ value: string; label: string } | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<{ value: string; label: string } | null>(null);

    const [loadingOrgs, setLoadingOrgs] = useState(false);
    const [loadingPeriods, setLoadingPeriods] = useState(false);

    const { journalType } = useJournal();

    const uniqueYears = [...new Set(periods.map(p => p.year.toString()))].map(year => ({
        value: year,
        label: year
    }));

    const monthsForSelectedYear = periods
        .filter(p => p.year.toString() === selectedYear?.value)
        .map(p => ({ value: p.month.toString(), label: p.month.toString() }));

    const orgOptions = organizations.map(mo => ({
        value: mo.code,
        label: mo.name || mo.code
    }));

    useEffect(() => {
        const fetchOrgs = async () => {
            setLoadingOrgs(true);
            try {
                const response = await api.get<MedOrganization[]>('/admin/rcontrol/medorg', {
                    journalType: journalType.toString()
                });

                if (response?.length) {
                    setOrganizations(response);
                }
            } catch (error) {
                console.error("Ошибка загрузки организаций:", error);
            } finally {
                setLoadingOrgs(false);
            }
        };

        fetchOrgs();
    }, [journalType]);

    useEffect(() => {
        if (!selectedOrg?.value) {
            setPeriods([]);
            setSelectedYear(null);
            setSelectedMonth(null);
            return;
        }

        const fetchPeriods = async () => {
            setLoadingPeriods(true);
            try {
                const response = await api.get<Period[]>('/admin/rcontrol/periods', {
                    codeMo: selectedOrg.value,
                    journalType: journalType.toString()
                });

                if (response?.length) {
                    setPeriods(response);
                } else {
                    setPeriods([]);
                }
            } catch (error) {
                console.error("Ошибка загрузки периодов:", error);
                setPeriods([]);
            } finally {
                setLoadingPeriods(false);
            }
        };
        fetchPeriods();
    }, [selectedOrg, journalType]);

    useEffect(() => {
        setSelectedMonth(null);
    }, [selectedYear]);

    useEffect(() => {
        setSelectedYear(null);
        setSelectedMonth(null);
    }, [selectedOrg]);

    const handleOrgChange = (option: any) => {
        setSelectedOrg(option);
        setSelectedYear(null);
        setSelectedMonth(null);
    };

    const handleYearChange = (option: any) => {
        setSelectedYear(option);
        setSelectedMonth(null);
    };

    const handleMonthChange = (option: any) => {
        setSelectedMonth(option);
        if (selectedOrg?.value && selectedYear?.value && option?.value) {
            onApplyFilters(selectedOrg.value, selectedYear.value, option.value);
        }
    };

    const customStyles = {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            backgroundColor: 'var(--app-white)',
            borderColor: state.isFocused ? 'var(--input-focus-background)' : 'var(--border-light)',
            borderRadius: '12px',
            padding: '0 8px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'var(--app-border-light-hover)'
            }
        }),
        option: (baseStyles: any, { isFocused, isSelected }: any) => ({
            ...baseStyles,
            backgroundColor: isSelected
                ? 'var(--border-light)'
                : isFocused
                    ? 'var(--input-focus-background)'
                    : 'var(--app-white)',
            color: isSelected
                ? 'black'
                : isFocused
                    ? 'black'
                    : 'black',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '12px',
            transition: 'all 0.2s ease',
            '&:active': {
                backgroundColor: isSelected
                    ? 'var(--border-light)'
                    : isFocused
                        ? 'var(--bg-app-light)'
                        : 'var(--app-white)',
            },
        }),
        menuList: (baseStyles: any) => ({
            ...baseStyles,
            scrollbarWidth: 'thin',
            scrollbarColor: `var(--border-light) transparent`,
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: 'var(--app-white)',
            borderRadius: '12px',
            marginTop: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            fontSize: '0.9rem',
            padding: '4px',
            zIndex: 100
        }),
        placeholder: (baseStyles: any) => ({
            ...baseStyles,
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
        }),
        singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: 'var(--text-secondary) !important',
            fontSize: '0.9rem',
            fontWeight: 500
        }),
        indicatorSeparator: () => ({
            display: 'none'
        })
    };

    return (
        <div className={styles.container}>
            <span>Журнал реестров:</span>

            <div className={styles.select_container}>
                <span>Код организации:</span>
                <Select
                    value={selectedOrg}
                    onChange={handleOrgChange}
                    placeholder="Выберите МО"
                    options={orgOptions}
                    styles={customStyles}
                    noOptionsMessage={() => loadingOrgs ? "Загрузка..." : "Не найдено"}
                    isLoading={loadingOrgs}
                />
            </div>

            <div className={styles.select_container}>
                <span>Год:</span>
                <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    placeholder={selectedOrg === null ? "Сначала выберите МО" : "Укажите год"}
                    options={uniqueYears}
                    styles={customStyles}
                    noOptionsMessage={() => loadingPeriods ? "Загрузка..." : "Нет данных"}
                    isDisabled={selectedOrg === null || loadingPeriods}
                    isLoading={loadingPeriods && selectedOrg !== null}
                />
            </div>

            <div className={styles.select_container}>
                <span>Месяц:</span>
                <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    placeholder={selectedYear === null ? "Сначала выберите год" : "Укажите месяц"}
                    options={monthsForSelectedYear}
                    styles={customStyles}
                    noOptionsMessage={() => "Нет данных"}
                    isDisabled={selectedYear === null || loadingPeriods}
                />
            </div>
        </div>
    );
};