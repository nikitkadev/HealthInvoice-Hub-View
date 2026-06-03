import { type Case, type FinishedCase, type InvoiceShortly } from "./types";

import { useJournal } from "../../../app/contexts/JournalTypeContext";
import { api } from "../../../shared/api/ApiClient";
import { useEffect, useState } from "react";

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

    const [isBriefInvoicesFetching, setIsBriefInvoicesFetching] = useState(false);
    const [isFinishedCasesFetching, setIsFinishedCasesFetching] = useState(false);
    const [isCasesFetching, setIsCasesFetching] = useState(false);

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


    const fetchFinishedCases = async (schetUid: number) => {

        setIsFinishedCasesFetching(true);

        try {

            const response = await api.get('/admin/rcontrol/finished_cases', {
                schetUid: schetUid.toString(),
                journalType: journalType.toString()
            });

            if (!response) {
                return;
            }

            setFinishedCases(response);
        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setIsFinishedCasesFetching(false);
        }
    };

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

    return {
        shortlyInvoices,
        finishedCases,
        cases,
        fetchFinishedCases,
        fetchCases,
        setFilterParams,
        isBriefInvoicesFetching,
        isFinishedCasesFetching,
        isCasesFetching
    }
};

export default useRControlData;