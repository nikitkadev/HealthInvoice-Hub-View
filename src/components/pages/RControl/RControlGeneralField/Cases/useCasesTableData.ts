import type { Case } from "../../types";
import { useEffect } from "react";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { api } from "../../../../../shared/api/ApiClient";

const useCasesTableData = () => {

    const {
        setCasesData,
        selectedFinishedCase,
        setLoading } = useRControlStore();
    const { journalType } = useJournal();

    useEffect(() => {
        const fetchCases = async () => {

            setLoading("cases", true);

            try {

                if (!selectedFinishedCase) {

                    setCasesData([]);
                    return;
                };

                const params: Record<string, string> = {
                    zSlUid: selectedFinishedCase.zSlUid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<Case[]>('/admin/rcontrol/cases', params);

                if (!response) {
                    return;
                }

                setCasesData(response);
            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading("cases", false);
            }
        };

        fetchCases();

    }, [selectedFinishedCase]);
};

export default useCasesTableData;