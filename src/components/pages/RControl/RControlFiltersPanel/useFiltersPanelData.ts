import type { MedOrganization, Period } from "./types";

import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../../shared/api/ApiClient";
import { useJournal } from "../../../../app/contexts/JournalTypeContext";

const useFiltersPanelData = () => {

    const [orgs, setOrgs] = useState<MedOrganization[]>([]);
    const [periods, setPeriods] = useState<Period[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { journalType } = useJournal();

    const fetchOrganizations = async () => {

        setIsLoading(true);

        try {
            const response = await api.get('/admin/rcontrol/medorg', {
                journalType: journalType.toString()
            });

            if (!response) {
                return;
            }

            setOrgs(response);
        }
        catch (error) {
            console.debug(error);
            toast.error("Ошибка при попытке получить данные по МО!");
        }
        finally {
            setIsLoading(false);
        };

    };

    const fetchPeriods = async (codeOrg: string) => {
        setIsLoading(true);

        try {
            const response = await api.get('/admin/rcontrol/periods', {
                codeMo: codeOrg,
                journalType: journalType.toString()
            });

            if (!response) {
                return;
            }

            setPeriods(response);
        }
        catch (error) {
            console.debug(error);
            toast.error("Ошибка при попытке получить данные по периодам!");
        }
        finally {
            setIsLoading(false);
        };

    };

    return {
        fetchOrganizations,
        fetchPeriods,
        orgs,
        periods,
        isLoading,
    };
};

export default useFiltersPanelData; 