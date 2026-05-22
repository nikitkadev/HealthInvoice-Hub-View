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

    return (
        <div className={styles.paginationRoot}>

            <div className={styles.selection}>
                <p>Показывать по:</p>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className={styles.select}
                >
                    <option className={styles.option} value={25}>25</option>
                    <option className={styles.option} value={50}>50</option>
                    <option className={styles.option} value={100}>100</option>
                </select>
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