import type { FinishedCase, FinishedCasesResponse } from "../../../types";
import { useEffect, useState } from "react";
import { useRControlStore } from "../../../useRControlStore";
import { api } from "../../../../../../shared/api/ApiClient";
import { useJournal } from "../../../../../../app/contexts/JournalTypeContext";

const useFinishedCasesTableData = () => {

    const [data, setData] = useState<FinishedCase[]>([]);
    const { journalType } = useJournal();
    const {
        setLoading,
        selectedInvoice,
        finishedCasesTablePagination,
        globalSearchString,
        setFinishedCasesTablePagination } = useRControlStore();

    useEffect(() => {

        const fetchFinishedCases = async () => {

            setLoading("finishedCases", true);

            try {

                if (!selectedInvoice) {
                    return;
                }

                const params: Record<string, string> = {
                    schetUid: selectedInvoice.schetUid.toString(),
                    journalType: journalType.toString(),
                    page: finishedCasesTablePagination.currentPage.toString(),
                    pageSize: finishedCasesTablePagination.pageSize.toString(),
                    globalSearchString: globalSearchString.finishedCases
                }

                const response = await api.get<FinishedCasesResponse>('/admin/rcontrol/finished_cases', params);

                if (!response) {
                    return;
                }

                setData(response.items);
                setFinishedCasesTablePagination({
                    totalItems: response.total,
                    totalPages: Math.ceil(response.total / response.pageSize)
                });

            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading("finishedCases", false);
            }
        };

        fetchFinishedCases();

    }, [selectedInvoice, finishedCasesTablePagination.currentPage]);

    return { data };

};

export default useFinishedCasesTableData;