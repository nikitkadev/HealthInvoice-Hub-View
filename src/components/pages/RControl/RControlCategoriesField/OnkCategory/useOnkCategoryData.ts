import { type OnkAdditionalData, type OnkSluchDto } from "../types";
import { useEffect } from "react";
import { api } from "../../../../../shared/api/ApiClient";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";

export const useOnkCategoryData = () => {
    const { selectedCase } = useRControlStore();
    const { journalType } = useJournal();
    const { setOnkSluch, onkSluch, setOnkAdditionalData, setLoading } = useRControlCategoriesStore();

    useEffect(() => {

        const fetchOnkSluch = async () => {

            try {

                if (!selectedCase) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedCase.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<OnkSluchDto>('/admin/rcontrol/category/onk/onk-sluch', params);

                if (!response) {
                    return;
                }

                setOnkSluch(response);
            }
            catch (error) {
                console.debug(error);
            }
        };

        fetchOnkSluch();

    }, [selectedCase]);

    useEffect(() => {
        const fetchOnkAdditionalData = async () => {

            setLoading('additional', true);

            try {

                if (!onkSluch) {
                    return;
                }

                const params: Record<string, string> = {
                    onkSluchUid: onkSluch.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<OnkAdditionalData>('/admin/rcontrol/category/onk/addtitional-information', params);

                if (!response) {
                    return;
                }

                setOnkAdditionalData(response);

            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading('additional', false);
            }
        };

        fetchOnkAdditionalData();

    }, [onkSluch])
};