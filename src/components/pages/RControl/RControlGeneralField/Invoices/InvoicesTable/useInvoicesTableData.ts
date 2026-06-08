import { type InvoicesResponse } from "../../../types";

import { useEffect } from "react";
import { api } from "../../../../../../shared/api/ApiClient";
import { useRControlStore } from "../../../useRControlStore";
import { useJournal } from "../../../../../../app/contexts/JournalTypeContext";

const useInvoicesTableData = () => {

    const {
        filters,
        setLoading,
        invoicesTablePagination,
        globalSearchString,
        setInvoicesTablePagination,
        setInvoiceData } = useRControlStore();

    const { journalType } = useJournal();

    useEffect(() => {

        const fetchShortlyInvoices = async () => {

            setLoading("invoices", true);

            try {

                if (!filters.codeMo || !filters.month || !filters.year) {
                    setInvoicesTablePagination({
                        currentPage: 1,
                        totalPages: 1
                    });
                    setInvoiceData([]);
                    return;
                };

                const params: Record<string, string> = {
                    codeMo: filters.codeMo,
                    year: filters.year.toString(),
                    month: filters.month.toString(),
                    journalType: journalType.toString(),
                    page: invoicesTablePagination.currentPage.toString(),
                    pageSize: invoicesTablePagination.pageSize.toString(),
                    globalSearchString: globalSearchString.invoices
                };

                const response = await api.get<InvoicesResponse>('/admin/rcontrol/invoices_shortly', params);

                if (!response) {
                    return;
                }

                setInvoiceData(response.items);
                setInvoicesTablePagination({
                    totalItems: response.total,
                    totalPages: Math.ceil(response.total / response.pageSize)
                });

            }
            catch (error) {
                console.debug(error)
            }
            finally {
                setLoading("invoices", false);
            }

        };

        fetchShortlyInvoices();

    }, [
        filters,
        invoicesTablePagination.currentPage]);

};

export default useInvoicesTableData;