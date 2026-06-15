import { useEffect } from "react";
import { useRControlStore } from "../../useRControlStore";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";
import { api } from "../../../../../shared/api/ApiClient";
import type { NazNaprCategoryDto } from "../types";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";

export const useNazNaprCategoryData = () => {

    const { selectedCase } = useRControlStore();
    const { journalType } = useJournal();
    const { setNazNaprCategoryData } = useRControlCategoriesStore();

    useEffect(() => {
        
        const fetchNazNaprCategoryData = async () => {

            if (!selectedCase) {
                return;
            }

            const params: Record<string, string> = {
                sluchUid: selectedCase.uid.toString(),
                journalType: journalType.toString()
            }

            const response = await api.get<NazNaprCategoryDto>('/admin/rcontrol/category/naz-napr', params);

            if (!response) {
                return;
            }

            setNazNaprCategoryData(response);
        }

        fetchNazNaprCategoryData();

    }, [selectedCase])
};

