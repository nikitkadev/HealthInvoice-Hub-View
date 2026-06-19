import { useState } from "react";
import Button from "../../../ui/Button/Button";
import styles from "./styles.module.scss";
import { useRControlStore } from "../useRControlStore";
import { toast } from "react-toastify";
import { api } from "../../../../shared/api/ApiClient";



const RControlActionPanel = () => {

    const { setLoading } = useRControlStore();

    const [org, setOrg] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");

    const performGeneralMek = async () => {

        setLoading("generalMek", true);

        try {

            if (year === '' || month === '') {
                toast.warning("Заполните период!");
            };

            const params: Record<string, string> = {
                organizationCode: org,
                month: month,
                year: month
            };

            await api.postWithoutContent('/invoices/general-logic-control', params);

            toast.success("Общий МЕК успешно выполнен!");

        }
        catch (error) {
            console.debug(error)
        }
        finally {
            setLoading("generalMek", false);
        }
    }

    return (
        <div className={styles.rControlActionPanelRoot}>
            <div className={styles.generalMekSection}>

                <input
                    placeholder="Организация"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)} />

                <input
                    placeholder="Год"
                    value={year}
                    onChange={(e) => setYear(e.target.value)} />

                <input
                    placeholder="Месяц"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)} />

                <Button
                    onClick={performGeneralMek}
                    variant='primary'
                    fullWidth={true}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.883 9.167l3.334 3.333m0 0l-3.334 3.333m3.334-3.333H10.05a3.333 3.333 0 0 1-3.333-3.333" />
                    </svg>
                    <span>
                        Выполнить общий МЕК
                    </span>
                </Button>
            </div>
        </div>
    )
};

export default RControlActionPanel;