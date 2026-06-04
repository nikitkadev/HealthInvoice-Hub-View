import { useEffect, useState } from 'react';
import { useJournal } from '../../../../app/contexts/JournalTypeContext';

import JournalTypeToggle from '../../../ui/JournalTypeToggle';

import styles from './styles.module.scss';
import Select, { type StylesConfig } from 'react-select';
import useFiltersPanelData from './useFiltersPanelData';
import useDateExtension from '../../../../shared/extension/useDateExtension';

interface RControlFiltersPanelProps {
    setFilterParams: (params: {
        codeMo?: string,
        year?: number,
        month?: number
    }) => void;
}

const RControlFiltersPanel = ({ setFilterParams }: RControlFiltersPanelProps) => {

    const customSelectStylesProp: StylesConfig = {

        control: (base) => ({
            ...base,
            border: '1px solid var(--default-element-border-color)',
            borderRadius: 'var(--rounding-m)',
            fontSize: 'var(--font-size-default-very-small)',
            fontWeight: '600',
            padding: '.1rem',
            '&:hover': {
                borderColor: 'var(--gray-300)'
            },

            boxShadow: 'none'
        }),

        menu: (base) => ({
            ...base,
            border: '1px solid var(--default-element-border-color)',
            borderRadius: 'var(--rounding-m)',
            boxShadow: 'none',
            padding: '.25rem'
        }),

        menuList: (base) => ({
            ...base,
            scrollbarColor: 'var(--default-element-border-color) transparent',
            scrollbarWidth: 'thin'
        }),

        option: (base, state) => ({
            ...base,
            marginTop: '.25rem',
            textAlign: 'center',
            fontSize: 'var(--font-size-default-very-small)',
            fontWeight: '500',
            borderRadius: 'var(--rounding-m)',
            ":hover": {
                backgroundColor: 'var(--gray-200)',
                color: 'var(--black)'
            },
            color: 'var(--black)',
            background: state.isSelected ? 'var(--gray-150)' : 'var(--white)'
        }),

        placeholder: (base) => ({
            ...base,
            color: 'var(--gray-400)',
            fontWeight: '400'
        }),

        noOptionsMessage: (base) => ({
            ...base,
            fontWeight: '400',
            fontSize: 'var(--font-size-default-very-small)',
        })

    };

    const [selectedOrg, setSelectedOrg] = useState<{ value: string, label: string } | null>(null);
    const [selectedYear, setSelectedYear] = useState<{ value: number, label: number } | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<{ value: number, label: number } | null>(null);

    const { journalType, setJournalType } = useJournal();
    const { monthToString } = useDateExtension();

    const {
        fetchOrganizations,
        fetchPeriods,
        orgs,
        periods,
        isLoading } = useFiltersPanelData();

    const orgsOption = orgs.map(org => ({
        value: org.code,
        label: org.code
    }));

    const yearsOptions = periods
        .map(period => ({
            value: period.year,
            label: period.year
        }));

    const monthOptions = periods
        .filter(period => period.year === selectedYear?.value)
        .map(period => ({
            value: period.month,
            label: monthToString(period.month)
        }));

    useEffect(() => {
        document.title = "HIH - RControl Веб";
        fetchOrganizations();
    }, []);

    useEffect(() => {

        setSelectedMonth(null);
        setSelectedYear(null);

        if (selectedOrg?.value) {
            fetchPeriods(selectedOrg?.value);
        };

    }, [selectedOrg]);

    useEffect(() => {
        setSelectedMonth(null);
    }, [selectedYear]);

    useEffect(() => {
        setFilterParams({
            codeMo: selectedOrg?.value,
            month: selectedMonth?.value,
            year: selectedYear?.value
        });
    }, [selectedMonth]);

    useEffect(() => {
        
        const clearAllLocalFilters = () => {
            setSelectedOrg(null);
            setSelectedMonth(null);
            setSelectedYear(null);
        };

        clearAllLocalFilters();
    }, [journalType])

    return (
        <div className={styles.rControlFiltersPanelRoot}>

            <div className={styles.toggle}>
                <p>Тип журнала:</p>
                <JournalTypeToggle
                    value={journalType}
                    onChange={setJournalType} />
            </div>

            <div className={styles.selects}>

                <Select
                    options={orgsOption}
                    styles={customSelectStylesProp}
                    placeholder='Организации'
                    isLoading={isLoading}
                    value={selectedOrg}
                    onChange={(option) => setSelectedOrg(option as { value: string, label: string } | null)}
                    isDisabled={orgs.length === 0} />

                <Select
                    options={yearsOptions}
                    styles={customSelectStylesProp}
                    placeholder='Период (год)'
                    isLoading={isLoading}
                    value={selectedYear}
                    onChange={(option) => setSelectedYear(option as { value: number, label: number } | null)}
                    isDisabled={periods.length === 0}
                    noOptionsMessage={() => 'Нет данных'} />

                <Select
                    options={monthOptions}
                    styles={customSelectStylesProp}
                    placeholder='Период (месяц)'
                    isLoading={isLoading}
                    value={selectedMonth}
                    onChange={(option) => setSelectedMonth(option as { value: number, label: number } | null)}
                    isDisabled={periods.length === 0}
                    noOptionsMessage={() => 'Нет данных'} />

            </div>
        </div>
    )
};

export default RControlFiltersPanel;