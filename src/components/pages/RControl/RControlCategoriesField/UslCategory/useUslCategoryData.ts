import { useEffect } from "react";
import { useRControlStore } from "../../useRControlStore";
import { api } from "../../../../../shared/api/ApiClient";
import type { MedDevs, ServicesDto } from "../types";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import { useRControlCategoriesStore } from "../useRControlCategoriesStore";

const useUslCategoryData = () => {

    const { selectedCase } = useRControlStore();
    const {
        setServices,
        setMedDevs,
        selectedService } = useRControlCategoriesStore();
    const { journalType } = useJournal();

    useEffect(() => {
        const fetchServices = async () => {
            try {

                if (!selectedCase) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedCase.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<ServicesDto[]>('/admin/rcontrol/category/services', params);

                if (!response) {
                    return;
                }

                setServices(response);
            }
            catch (error) {
                console.debug(error);
            }
        };

        fetchServices();
    }, [selectedCase]);

    useEffect(() => {
        const fetchServices = async () => {
            try {

                if (!selectedService) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedService.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<MedDevs[]>('/admin/rcontrol/category/med-devs', params);

                if (!response) {
                    return;
                }

                setMedDevs(response);
            }
            catch (error) {
                console.debug(error);
            }
        };

        fetchServices();
    }, [selectedService])
};

export default useUslCategoryData;