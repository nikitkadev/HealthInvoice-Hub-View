import { type InjData, type LekPrDto, type OnkAdditionalData, type OnkSluchDto } from "../types";
import { useEffect } from "react";
import { api } from "../../../../../shared/api/ApiClient";
import { useRControlStore } from "../../useRControlStore";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";

export const useOnkCategoryData = () => {
    const { selectedCase } = useRControlStore();
    const { journalType } = useJournal();
    const {
        setOnkSluch,
        onkSluch,
        setOnkAdditionalData,
        setLoading,
        selectedOnkService,
        setLekPrs,
        selectedLekPr,
        setInjData } = useRControlCategoriesStore();

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

    }, [onkSluch]);

    useEffect(() => {

        const fetchLekPrData = async () => {

            setLoading('lekPr', true);

            try {

                if (!selectedOnkService) {
                    return;
                }

                const params: Record<string, string> = {
                    onkUslUid: selectedOnkService.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<LekPrDto[]>('/admin/rcontrol/category/onk/lek-pr', params);

                if (!response) {
                    return;
                }

                setLekPrs(response);

            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading('lekPr', false);
            }

        };

        fetchLekPrData();

    }, [selectedOnkService]);

    useEffect(() => {

        const fetchInjData = async () => {

            setLoading('inj', true);

            try {

                if (!selectedLekPr) {
                    return;
                }

                const params: Record<string, string> = {
                    lekPrUid: selectedLekPr.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<InjData>('/admin/rcontrol/category/onk/injs-data', params);

                if (!response) {
                    return;
                }

                setInjData(response);

            }
            catch (error) {
                console.debug(error);
            }
            finally {
                setLoading('inj', false);
            }
        };

        fetchInjData();

    }, [selectedLekPr])
};