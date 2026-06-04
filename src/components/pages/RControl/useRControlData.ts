import { type Case, type FinishedCase, type FinishedCasesResponse, type InvoiceShortly } from "./types";

import { useJournal } from "../../../app/contexts/JournalTypeContext";
import { api } from "../../../shared/api/ApiClient";
import { useEffect, useState, useCallback } from 'react';

const useRControlData = () => {

    const [shortlyInvoices, setShortlyInvoices] = useState<InvoiceShortly[]>([]);
    const [finishedCases, setFinishedCases] = useState<FinishedCase[]>([]);
    const [cases, setCases] = useState<Case[]>([]);
    const [filterParams, setFilterParams] = useState<{
        codeMo?: string,
        year?: number,
        month?: number
    }>({
        codeMo: undefined,
        year: undefined,
        month: undefined
    });
    const [globalSearchString, setGlobalSearchString] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceShortly | null>(null);
    const [isBriefInvoicesFetching, setIsBriefInvoicesFetching] = useState(false);
    const [isFinishedCasesFetching, setIsFinishedCasesFetching] = useState(false);
    const [isCasesFetching, setIsCasesFetching] = useState(false);

    const [finishedCasesPagination, setFinishedCasesPagination] = useState<{
        currentPage: number,
        pageSize: number,
        totalPages: number,
        totalItems: number
    }>({
        currentPage: 1,
        pageSize: 25,
        totalPages: 1,
        totalItems: 0
    });

    const { journalType } = useJournal();

    useEffect(() => {
        const fetchShortlyInvoices = async () => {

            setIsBriefInvoicesFetching(true);

            try {

                if (!filterParams.codeMo || !filterParams.month || !filterParams.year) {
                    return;
                }

                const response = await api.get('/admin/rcontrol/invoices_shortly', {
                    codeMo: filterParams.codeMo,
                    year: filterParams.year.toString(),
                    month: filterParams.month.toString(),
                    journalType: journalType.toString()
                });

                if (!response) {
                    return;
                }

                setShortlyInvoices(response);

            }
            catch (error) {

            }
            finally {
                setIsBriefInvoicesFetching(false);
            }
        };

        fetchShortlyInvoices();
    }, [filterParams]);


    const fetchFinishedCases = useCallback(async () => {

        setIsFinishedCasesFetching(true);

        try {

            if (!selectedInvoice) {
                return;
            }

            const response = await api.get<FinishedCasesResponse>('/admin/rcontrol/finished_cases', {
                schetUid: selectedInvoice.schetUid.toString(),
                journalType: journalType.toString(),
                page: finishedCasesPagination.currentPage.toString(),
                pageSize: finishedCasesPagination.pageSize.toString(),
                globalSearchString: globalSearchString
            });

            if (!response) {
                return;
            }

            setFinishedCases(response.items);
            setFinishedCasesPagination(prev => ({
                ...prev,
                totalItems: response.total,
                totalPages: Math.ceil(response.total / prev.pageSize)
            }));

        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setIsFinishedCasesFetching(false);
        }
    }, [
        journalType,
        finishedCasesPagination.currentPage,
        finishedCasesPagination.pageSize,
        selectedInvoice,
        globalSearchString]);

    const fetchCases = async (zSlUid: number) => {

        setIsCasesFetching(true);

        try {

            const response = await api.get('/admin/rcontrol/cases', {
                zSlUid: zSlUid.toString(),
                journalType: journalType.toString()
            });

            if (!response) {
                return;
            };

            setCases(response);
        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setIsCasesFetching(false);
        }
    }

    const goToPage = (page: number) => {
        if (page < 1 || page > finishedCasesPagination.totalPages) return;
        setFinishedCasesPagination(prev => ({ ...prev, currentPage: page }));
    };

    useEffect(() => {
        if (selectedInvoice) {
            fetchFinishedCases();
        }
    }, [finishedCasesPagination.currentPage]);

    useEffect(() => {
        setFinishedCasesPagination(prev => ({
            ...prev,
            currentPage: 1
        }))

        fetchFinishedCases();
        setCases([]);

    }, [selectedInvoice, globalSearchString]);

    useEffect(() => {
        setCases([]);
        setFinishedCases([]);
        setShortlyInvoices([]);
        setFilterParams({
            codeMo: undefined,
            year: undefined,
            month: undefined
        })
    }, [journalType]);


    return {
        setGlobalSearchString,
        setSelectedInvoice,
        shortlyInvoices,
        finishedCases,
        cases,
        fetchFinishedCases,
        fetchCases,
        setFilterParams,
        isBriefInvoicesFetching,
        isFinishedCasesFetching,
        isCasesFetching,
        goToPage,
        finishedCasesPagination
    }
};

export default useRControlData;