import { useEffect } from "react";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { api } from "../../../../../shared/api/ApiClient";
import type { DefectDto, ResponseWithPagination, SankDto } from "../types";

export const useDefectsSanksCategoryData = () => {

    const { selectedCase } = useRControlStore();
    const { journalType } = useJournal();
    const {
        defectsTablePagination,
        setLoading,
        setDefects,
        setSanks,
        resetPagination } = useRControlCategoriesStore();

    const fetchDefects = async () => {

        setLoading("defects", true);

        try {

            if (!selectedCase) {
                return;
            }

            const params: Record<string, string> = {
                sluchUid: selectedCase.uid.toString(),
                journalType: journalType.toString(),
                page: defectsTablePagination.currentPage.toString(),
                pageSize: defectsTablePagination.pageSize.toString()
            };

            const response = await api.get<ResponseWithPagination<DefectDto[]>>('/admin/rcontrol/category/defects-sanks/defects', params);

            if (!response) {
                return;
            }

            setDefects(response.items);
        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setLoading("defects", false);
        }
    }

    const fetchSanks = async () => {

        setLoading("sanks", true);

        try {

            if (!selectedCase) {
                return;
            }

            const params: Record<string, string> = {
                sluchUid: selectedCase.uid.toString(),
                journalType: journalType.toString()
            };

            const response = await api.get<SankDto[]>('/admin/rcontrol/category/defects-sanks/sanks', params);

            if (!response) {
                return;
            }

            setSanks(response);

        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setLoading("sanks", true);
        }
    }

    useEffect(() => {
        resetPagination();
        fetchDefects();
        fetchSanks();
    }, [selectedCase]);

    useEffect(() => {
        fetchDefects();
    }, [defectsTablePagination.currentPage])
};