import { useEffect } from "react";
import { useRControlStore } from "../../useRControlStore";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { api } from "../../../../../shared/api/ApiClient";
import type { KsgHmpCategoryDataDto } from "../types";

export const useKsgVmpCategoryData = () => {

    const { selectedCase } = useRControlStore();
    const { setKsgHmpData } = useRControlCategoriesStore();
    const { journalType } = useJournal();

    useEffect(() => {
        const fetchKsgHmpCategoryData = async () => {
            try {

                if (!selectedCase) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedCase.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<KsgHmpCategoryDataDto>('/admin/rcontrol/category/ksg-vmp', params);

                if (!response) {
                    return;
                }

                setKsgHmpData(response);

            }
            catch (error) {
                console.debug(error);
            }
        };

        fetchKsgHmpCategoryData();

    }, [selectedCase])
};

