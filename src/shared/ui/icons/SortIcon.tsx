import type { SortState } from "../../../components/app_lk_journal/general/JournalData";

export const SortIcon = ({ column, currentSort }: { column: string, currentSort: SortState }) => {
    if (currentSort.column !== column) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <title>Replace SVG Icon</title>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4" d="M11.5 17.5L5 11m0 0v4.5M5 11h4.5m3-4.5L19 13m0 0V8.5m0 4.5h-4.5" />
            </svg>
        );
    }

    if (currentSort.direction === 'asc') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m7 15l4.859-4.859a.2.2 0 0 1 .282 0L17 15" />
            </svg>
        );
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m7 10l4.859 4.859a.2.2 0 0 0 .282 0L17 10" />
        </svg>
    );
} 