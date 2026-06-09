import { useEffect, useState } from "react";
import type { AllCasesDto } from "../types";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { api } from "../../../../../shared/api/ApiClient";

const useAllCasesCategoryData = () => {

    const [data, setData] = useState<AllCasesDto | null>(null);
    const { journalType } = useJournal();
    const { selectedCase } = useRControlStore();


    useEffect(() => {

        const fetchAllCasesDataAsync = async () => {

            try {
                if (!selectedCase) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedCase.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<AllCasesDto>('/admin/rcontrol/category/all-cases', params);

                if (!response) {
                    return;
                }

                setData(response);
            }
            catch {

            }
        };

        fetchAllCasesDataAsync();

    }, [selectedCase])

    return { data };
};

export default useAllCasesCategoryData;