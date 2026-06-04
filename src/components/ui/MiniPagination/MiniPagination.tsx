import Button from '../Button/Button';
import styles from './styles.module.scss';

interface MiniPaginationProps {
    pagination: {
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    },
    onPageChange: (page: number) => void;
};

const MiniPagination = ({
    pagination,
    onPageChange
}: MiniPaginationProps) => {
    return (
        <div className={styles.miniPaginationRoot}>

            <div className={styles.select}>

            </div>

            <div className={styles.action}>

                <Button
                    variant='smallIcon'
                    fullWidth={false}
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="var(--black)"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m14 16l-4-4l4-4" />
                    </svg>
                </Button>

                <span>{pagination.currentPage} / {pagination.totalPages}</span>

                <Button
                    variant='smallIcon'
                    fullWidth={false}
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="var(--black)"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m10 8l4 4l-4 4" />
                    </svg>
                </Button>

            </div>

        </div>
    )
};

export default MiniPagination;