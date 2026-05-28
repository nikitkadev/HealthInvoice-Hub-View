import Select from 'react-select';
import Button from '../Button/Button';
import styles from './styles.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (currentPage > 3) pages.push('...');

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) pages.push('...');

        pages.push(totalPages);

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const options = [
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' }
    ];

    const customStyles = {
        control: (base: any, { isFocused }: any) => ({
            ...base,
            backgroundColor: 'var(--input-background-color)',
            borderColor: isFocused ? 'var(--default-element-border-color)' : 'var(--default-element-border-color)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: 'var(--rounding-s)',
            boxShadow: 'none',
            minHeight: '36px',
            '&:hover': {
                borderColor: 'var(--default-element-border-color)'
            }
        }),
        input: (base: any) => ({
            ...base,
            color: 'var(--default-element-text-color)',
            fontSize: 'var(--font-size-default-small)'
        }),
        placeholder: (base: any) => ({
            ...base,
            color: 'var(--app-secondary-text-color)',
            fontSize: 'var(--font-size-default-small)'
        }),
        menu: (base: any) => ({
            ...base,
            background: 'var(--default-element-background-color)',
            borderRadius: 'var(--rounding-s)',
            overflow: 'hidden'
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '4px',
            background: 'var(--)'
        }),
        option: (base: any, { isFocused, isSelected }: any) => ({
            ...base,
            backgroundColor: isSelected
                ? 'var(--gray-150)'
                : isFocused
                    ? 'var(--gray-150)'
                    : 'transparent',
            color: isSelected
                ? 'var(--app-primary-text-color)'
                : 'var(--default-element-text-color)',
            cursor: 'pointer',
            borderRadius: 'var(--rounding-s)',
            padding: '8px 12px',
            fontSize: 'var(--font-size-default-small)',
            '&:active': {
                backgroundColor: 'var(--gray-200)'
            }
        }),
        singleValue: (base: any) => ({
            ...base,
            color: 'var(--default-element-text-color)',
            fontSize: 'var(--font-size-default-small)'

        }),

        dropdownIndicator: (base: any) => ({
            ...base,
            color: 'var(--app-secondary-text-color)',
            padding: '4px 8px',
            '&:hover': {
                color: 'var(--app-primary-text-color)'
            }
        }),

        indicatorSeparator: () => ({
            display: 'none'
        }),

        clearIndicator: (base: any) => ({
            ...base,
            color: 'var(--app-secondary-text-color)',
            '&:hover': {
                color: 'var(--status-error)'
            }
        }),

        loadingIndicator: (base: any) => ({
            ...base,
            color: 'var(--app-secondary-text-color)'
        }),

        noOptionsMessage: (base: any) => ({
            ...base,
            color: 'var(--app-secondary-text-color)',
            fontSize: 'var(--font-size-default)',
            padding: '16px'
        })
    };

    return (
        <div className={styles.paginationRoot}>

            <div className={styles.selection}>
                <p>Показывать по:</p>

                <Select value={options.find(opt => opt.value === pageSize)}
                    onChange={(opt) => onPageSizeChange(opt?.value ?? 25)}
                    options={options}
                    menuPlacement='top'
                    styles={customStyles} />
            </div>

            <div className={styles.controls}>

                <Button
                    variant='icon'
                    fullWidth={false}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 16l-4-4l4-4" />
                    </svg>
                </Button>

                {pageNumbers.map((page, index) => (
                    typeof page === 'number' ? (
                        <Button
                            key={index}
                            variant='icon'
                            onClick={() => onPageChange(page)}
                            fullWidth={false}
                            className={`${styles.page} ${currentPage === page ? styles.active : ''}`}>
                            {page}
                        </Button>
                    ) : (
                        <span key={index} className={styles.dots}>
                            {page}
                        </span>
                    )
                ))}

                <Button
                    variant='icon'
                    fullWidth={false}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 8l4 4l-4 4" />
                    </svg>
                </Button>

            </div>
        </div>
    );
};

export default Pagination;