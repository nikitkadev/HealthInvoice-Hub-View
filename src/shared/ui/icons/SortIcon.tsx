import type { SortState } from "../../../components/pages/LogicControlJournal/types";

export const SortIcon = ({ column, currentSort }: { column: string, currentSort: SortState }) => {
    if (currentSort.column !== column) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24">
                <path
                    fill="var(--black)"
                    d="M12 15a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z" />
            </svg>
        );
    }

    if (currentSort.direction === 'asc') {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path fill="var(--black)"
                    d="m12 9.5l-5 5h10l-5-5Z" />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path fill="var(--black)"
                d="m12 14.5l5-5H7l5 5Z" />
        </svg>
    );
} 