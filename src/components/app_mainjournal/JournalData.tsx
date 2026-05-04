import { useCallback, useEffect, useState } from "react";
import { api } from '../../shared/api/ApiClient';
import { useJournal } from "./JournalContext";
import { useAuth } from "../app_auth/auth_service/AuthProvider";

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

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            currentPage: 1  
        }));
    }, [journalType]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const response = await api.get<JournalResponse>('/journal/lk/fetch', {
                organizationCode: user?.organizationCode ?? '',
                journalType: journalType.toString(),
                page: pagination.currentPage.toString(),
                pageSize: pagination.pageSize.toString()
            });

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
    }, [journalType, pagination.currentPage, pagination.pageSize]);

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

    return {
        data,
        isLoading,
        pagination,
        goToPage,
        setPageSize,
        refreshData: fetchData
    }
}