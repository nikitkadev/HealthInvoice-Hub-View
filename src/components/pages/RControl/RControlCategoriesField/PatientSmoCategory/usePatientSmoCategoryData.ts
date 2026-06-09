import { useEffect, useState } from "react";
import { useRControlStore } from "../../useRControlStore";
import { api } from "../../../../../shared/api/ApiClient";
import { useJournal } from "../../../../../app/contexts/JournalTypeContext";
import type { PatientSmoCategoryDto } from "../types";

const usePatientSmoCategoryData = () => {

    const [data, setData] = useState<PatientSmoCategoryDto | null>(null)
    const { journalType } = useJournal();
    const { selectedCase } = useRControlStore();

    useEffect(() => {
        const fetchPatientSmoCategoryData = async () => {

            try {

                if (!selectedCase) {
                    return;
                }

                const params: Record<string, string> = {
                    sluchUid: selectedCase.uid.toString(),
                    journalType: journalType.toString()
                };

                const response = await api.get<PatientSmoCategoryDto>('/admin/rcontrol/category/patient-smo', params);

                if (!response) {
                    return;
                }

                setData(response);
            }
            catch (error) {
                console.debug(error);
            }
        }

        fetchPatientSmoCategoryData();

    }, [selectedCase]);

    return { data };
};

export default usePatientSmoCategoryData;