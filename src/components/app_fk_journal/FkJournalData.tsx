import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../app_auth/auth_service/AuthProvider";
import { useJournal } from "../app_mainjournal/JournalContext";
import { api } from "../../shared/api/ApiClient";

export interface FkJournalRecord {
    uid: number;
    uploadDate: Date;
    sourceArchiveFilename: string;
    organizationCode: string;
    status: number;
}

interface JournalResponse {
    items: FkJournalRecord[];
    total: number;
    page: number;
    pageSize: number;
}

export const useFkJournalData = () => {
    const { user } = useAuth();
    const { journalType } = useJournal();
    const [data, setData] = useState<FkJournalRecord[]>([]);
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

            const response = await api.get<JournalResponse>('/journal/fk/fetch', {
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