import { useCallback, useEffect, useState } from "react";
import { api } from '../../../shared/api/ApiClient';
import { useJournal } from "./JournalContext";
import { useAuth } from "../../app_auth/auth_service/AuthProvider";

export interface JournalRecord {
    uid: number;
    schetUid: number;
    uploadDate: Date;
    uploader: string;
    fileName: string;
    codeMO: string;
    nSchet: string;
    dSchet: Date;
    countSdZ: number;
    countError: number;
    status: number;
}

interface JournalResponse {
    items: JournalRecord[];
    total: number;
    page: number;
    pageSize: number;
}

export interface JournalFilters {
    organizationCode: string;
    schetNumber: string;
    username: string;
    filename: string;
    dateFrom: string;
    dateTo: string;
}

export const useJournalData = () => {
    const { user } = useAuth();
    const { journalType } = useJournal();
    const [data, setData] = useState<JournalRecord[]>([]);
    const [isLoading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 50,
        totalPages: 0,
        totalItems: 0
    });

    const [filters, setFilters] = useState<JournalFilters>({
        organizationCode: '',
        schetNumber: '',
        username: '',
        filename: '',
        dateFrom: '',
        dateTo: ''
    });

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            currentPage: 1
        }));
    }, [journalType]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const params: Record<string, string> = {
                organizationCode: (filters.organizationCode || user?.organizationCode) ?? '',
                journalType: journalType.toString(),
                page: pagination.currentPage.toString(),
                pageSize: pagination.pageSize.toString()
            };

            if (filters.schetNumber) params.schetNumber = filters.schetNumber;
            if (filters.username) params.username = filters.username;
            if (filters.filename) params.filename = filters.filename;
            if (filters.dateFrom) params.dateFrom = filters.dateFrom;
            if (filters.dateTo) params.dateTo = filters.dateTo;

            console.log(filters);

            const response = await api.get<JournalResponse>('/journal/lk/fetch', params);

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
    }, [journalType, pagination.currentPage, pagination.pageSize, filters]);


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
            organizationCode: '',
            schetNumber: '',
            username: '',
            filename: '',
            dateFrom: '',
            dateTo: ''
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
        resetFilters
    }
}