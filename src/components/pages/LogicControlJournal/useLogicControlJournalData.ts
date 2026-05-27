import type { LogicControlJournalFilters, LogicControlJournalRecord, LogicControlJournalResponse, SortState } from "./types"
;
import { useCallback, useEffect, useState } from "react";
import { api } from '../../../shared/api/ApiClient';
import { useJournal } from "../../../app/contexts/JournalTypeContext";
import { useAuth } from "../../app_auth/auth_service/AuthProvider";

const useLogicControlJournalData = () => {
    const { user } = useAuth();
    const { journalType } = useJournal();
    const [data, setData] = useState<LogicControlJournalRecord[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [sort, setSort] = useState<SortState>({ column: 'uploade_date', direction: 'desc' })

    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 50,
        totalPages: 0,
        totalItems: 0
    });

    const [filters, setFilters] = useState<LogicControlJournalFilters>({
        globalFilterTarget: '',
    });

    const handleSort = (column: string) => {
        setSort(prev => {
            if (prev.column !== column) {
                return { column, direction: 'desc' };
            }

            if (prev.column === column) {
                return { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }

            if (prev.direction === 'asc') {
                return { column, direction: 'desc' };
            }

            if (prev.direction === 'desc') {
                return { column, direction: null };
            }

            return { column, direction: 'asc' };
        });
    };


    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            currentPage: 1
        }));
    }, [journalType]);

    const fetchData = useCallback(async () => {

        setLoading(true);

        try {
            const params: Record<string, string> = {
                organizationCode: user?.organizationCode ?? '',
                journalType: journalType.toString(),
                page: pagination.currentPage.toString(),
                pageSize: pagination.pageSize.toString(),
                sortBy: sort.column,
                direction: sort.direction?.toString() ?? ''
            };

            if (filters.globalFilterTarget) params.globalFilterTarget = filters.globalFilterTarget;

            const response = await api.get<LogicControlJournalResponse>('/journal/lk/fetch', params);

            if (response) {
                setData(response.items);
                setPagination(prev => ({
                    ...prev,
                    totalItems: response.total,
                    totalPages: Math.ceil(response.total / prev.pageSize)
                }));
            }
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }, [journalType, pagination.currentPage, pagination.pageSize, filters, sort]);


    useEffect(() => {
        fetchData();
    }, [fetchData])

    const goToPage = (page: number) => {
        if (page < 1 || page > pagination.totalPages) return;
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const setPageSize = (size: number) => {
        setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
    };

    const resetFilters = () => {
        setFilters({
            globalFilterTarget: '',
        });
    }

    return {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize,
        refreshData: fetchData,
        filters,
        onChangeFilter: setFilters,
        resetFilters,
        handleSort,
        sort,
        isApplied: filters.globalFilterTarget !== ''
    }
};

export default useLogicControlJournalData;