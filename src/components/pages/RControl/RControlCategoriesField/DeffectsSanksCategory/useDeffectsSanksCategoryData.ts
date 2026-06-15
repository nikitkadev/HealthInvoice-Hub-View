import { useEffect } from "react";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { api } from "../../../../../shared/api/ApiClient";
import type { DeffectDto, SankDto } from "../types";

export const useDeffectsSanksCategoryData = () => {

    const { selectedCase } = useRControlStore();
    const { journalType } = useJournal();
    const {
        deffectsTablePagination,
        setLoading,
        setDeffects,
        setSanks,
        resetPagination } = useRControlCategoriesStore();

    const fetchDeffects = async () => {

        setLoading("deffects", true);

        try {

            if (!selectedCase) {
                return;
            }

            const params: Record<string, string> = {
                sluchUid: selectedCase.uid.toString(),
                journalType: journalType.toString(),
                page: deffectsTablePagination.currentPage.toString(),
                pageSize: deffectsTablePagination.pageSize.toString()
            };

            const response = await api.get<DeffectDto[]>('/admin/rcontrol/category/deffects-sanks/deffects', params);

            if (!response) {
                return;
            }

            setDeffects(response);
        }
        catch (error) {
            console.debug(error);
        }
        finally {
            setLoading("deffects", false);
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

            const response = await api.get<SankDto[]>('/admin/deffects-sanks-category/sanks', params);

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
        fetchDeffects();
        fetchSanks();
    }, [selectedCase]);

    useEffect(() => {
        fetchDeffects();
    }, [deffectsTablePagination.currentPage])
};