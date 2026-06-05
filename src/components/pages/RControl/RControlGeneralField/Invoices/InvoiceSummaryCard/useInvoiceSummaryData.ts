import type { SummaryResponse } from "../../../types";
import { useEffect, useState } from "react";
import { useRControlStore } from "../../../useRControlStore";
import { api } from "../../../../../../shared/api/ApiClient";
import { useJournal } from "../../../../../../app/contexts/JournalTypeContext";

const useInvoiceSummaryData = () => {

    const [data, setData] = useState<SummaryResponse | null>(null);
    const { setLoading, selectedInvoice } = useRControlStore();
    const { journalType } = useJournal();

    useEffect(() => {

        const fetchInvoiceSummaryData = async () => {
            setLoading("invoiceSummary", true);

            try {

                if (!selectedInvoice) {
                    return;
                }

                const params: Record<string, string> = {
                    schetUid: selectedInvoice.schetUid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<SummaryResponse>('/admin/rcontrol/invoice_summary', params);

                if (!response) {
                    return;
                }

                setData(response);

            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading("invoiceSummary", false);
            }

        };

        fetchInvoiceSummaryData();
    }, [selectedInvoice]);

    return { data };

};

export default useInvoiceSummaryData;