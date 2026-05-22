import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange
}: PaginationProps) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className={styles.paginationRoot}>
            
            <div className={styles.selection}>
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
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.button}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 6l-6 6l6 6" />
                    </svg>
                </button>

                <span className={styles.pageInfo}>
                    {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.button}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <title>Chevron-right-small SVG Icon</title>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 6l6 6l-6 6" />
                    </svg>
                </button>


                <div className={styles.info}>
                    Показано {startItem} - {endItem} из {totalItems} записей
                </div>
            </div>
        </div>
    );
}