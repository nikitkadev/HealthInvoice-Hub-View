import type { FinishedCasesResponse } from "../../../types";
import { useEffect } from "react";
import { useRControlStore } from "../../../useRControlStore";
import { api } from "../../../../../../shared/api/ApiClient";
import { useJournal } from "../../../../../../app/contexts/JournalTypeContext";

const useFinishedCasesTableData = () => {

    const { journalType } = useJournal();
    const {
        setLoading,
        selectedInvoice,
        finishedCasesTablePagination,
        globalSearchString,
        setFinishedCasesTablePagination,
        setFinishedCasesData } = useRControlStore();

    useEffect(() => {
        setFinishedCasesTablePagination({
            currentPage: 1,
        });
    }, [selectedInvoice])

    useEffect(() => {

        const fetchFinishedCases = async () => {
            setLoading("finishedCases", true);

            try {

                if (!selectedInvoice) {
                    setFinishedCasesTablePagination({
                        currentPage: 1,
                        totalPages: 1
                    });
                    setFinishedCasesData([]);
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

                setFinishedCasesData(response.items);
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

    }, [
        selectedInvoice,
        finishedCasesTablePagination.currentPage,
        globalSearchString.finishedCases]);

};

export default useFinishedCasesTableData;