import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/ApiClient';
import { useJournal } from '../../app_lk_journal/general/JournalContext';
import dayjs from 'dayjs';
import styles from './RControlPage.module.css';
import { RControlControlPanel } from './control_panel/RControlControlPanel';

interface MedOrganization {
    codeMo: string;
    nameMo: string;
}

interface Periods {
    year: number;
    month: number;
}

interface InvoiceShortly {
    status: number;
    nSchet: string;
    dSchet: Date;
    summav: number;
    sdZ?: number;
    schetUid: number;
}

interface InvoiceSummary {
    filename: string;
    schetUid: number;
    uploadDate: Date;

    summav: number;
    summap: number;
    sankMek: number;
    sankMee: number;
    sankEkmp: number;
    smoSummap: number;
    smoSankMek: number;
    smoSankMee: number;
    smoSankEkmp: number;
}

interface FinishedCase {
    persUid: number,
    pacientUid: number,
    zSlUid: number;
    positionNumber: number;
    recordNumber: number;
    surname: string;
    name: string;
    patronymic: string;
    uslOk: number;
    sPolis: string;
    nPolis: string;
    sumv: number;
    sump: number;
    smoSump: number;
}

interface Case {
    profil: number,
    det: number,
    prvs: number;
    startingAt: Date;
    endingAt: Date;
    ds1: string;
    edCol: number;
    tarif: number;
    sumM: number;
    sump: number;
    smoSump: number;
}

export const RControlPage = () => {

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const [orgs, setOrg] = useState<MedOrganization[]>([]);
    const [periods, setPeriods] = useState<Periods[]>([]);
    const [invoicesShortly, setInvoiceShortly] = useState<InvoiceShortly[]>([]);
    const [finishedCases, setFinishedCases] = useState<FinishedCase[]>([]);
    const [cases, setCases] = useState<Case[]>([]);

    const [selectedOrg, setSelectedOrg] = useState<MedOrganization | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<Periods | null>(null);
    const [selectedInvoiceShortlyRecord, setSelectedInvoiceShortlyRecord] = useState<InvoiceShortly | null>(null);
    const [selectedFinishedCase, setSelectedFinishedCase] = useState<FinishedCase | null>(null);
    const [invoiceSummary, setInvoiceSummary] = useState<InvoiceSummary | null>(null);

    const [showServiceInfo, setShowService] = useState(false);

    const { journalType } = useJournal();

    useEffect(() => {
        const fetchOrgs = async () => {
            setPeriods([]);
            setInvoiceShortly([]);

            try {
                const response = await api.get<MedOrganization[]>('/admin/rcontrol/medorg', {
                    journalType: journalType.toString()
                });

                if (response) {
                    setOrg(response);
                }
            }
            catch {
                console.debug("Ошибка при попытке получить организации");
            }
        }

        fetchOrgs();

    }, [])


    const fetchPeriods = async (codeMo: string) => {
        const response = await api.get<Periods[]>('/admin/rcontrol/periods', {
            codeMo: codeMo,
            journalType: journalType.toString()
        });

        if (response) {
            setPeriods(response);
        }
    }
    const fetchInvoiceShortly = async (period: Periods) => {
        setInvoiceShortly([]);

        try {
            const response = await api.get<InvoiceShortly[]>('/admin/rcontrol/invoices_shortly', {
                codeMo: selectedOrg?.codeMo ?? "",
                year: period.year.toString(),
                month: period.month.toString(),
                journalType: journalType.toString()
            })

            if (response) {
                setInvoiceShortly(response);
            }
        }
        catch {
            console.debug("Ошибка при попытке извлечь краткую информацию о счете");
        }
    }
    const fetchInvoiceSummary = async (schetUid: number) => {
        setInvoiceSummary(null);

        try {
            const response = await api.get<InvoiceSummary>('/admin/rcontrol/invoice_summary', {
                schetUid: schetUid.toString(),
                journalType: journalType.toString()
            });

            if (response) {
                setInvoiceSummary(response);
            }
        }
        catch {
            console.debug("Ошибка при попытке извлечь общую информацию о счете");
        }
    }
    const fetchFinishedCases = async (schetUid: number) => {
        setFinishedCases([]);

        try {
            const response = await api.get<FinishedCase[]>('/admin/rcontrol/finished_cases', {
                schetUid: schetUid.toString(),
                journalType: journalType.toString()
            });

            if (response) {
                setFinishedCases(response);
            }
        }
        catch {
            console.debug("Ошибка при попытке извлечь общую информацию о счете");
        }
    }
    const fetchCases = async (zSlUid: number) => {
        setCases([]);

        try {
            const response = await api.get<Case[]>('/admin/rcontrol/cases', {
                zSlUid: zSlUid.toString(),
                journalType: journalType.toString()
            });

            if (response) {
                setCases(response);
            }
        }
        catch {
            console.debug("Ошибка при попытке извлечь общую информацию о счете");
        }
    }


    const handleOrgClick = (org: MedOrganization) => {

        setPeriods([]);
        setInvoiceShortly([]);
        setFinishedCases([]);
        setCases([]);

        setInvoiceSummary(null);
        setSelectedFinishedCase(null);
        setSelectedInvoiceShortlyRecord(null);
        setSelectedPeriod(null);

        setShowService(false);
        setSelectedOrg(org);

        fetchPeriods(org.codeMo);
    }

    const handlePeriodClick = (period: Periods) => {

        setCases([]);
        setFinishedCases([]);

        setInvoiceSummary(null);
        setSelectedFinishedCase(null);
        setSelectedInvoiceShortlyRecord(null);

        setSelectedPeriod(period);
        setShowService(false);

        fetchInvoiceShortly(period);
    }
    const handleInvoiceShortlyClick = (invoiceShortly: InvoiceShortly) => {

        setCases([]);

        setSelectedFinishedCase(null);

        setSelectedInvoiceShortlyRecord(invoiceShortly);

        fetchInvoiceSummary(invoiceShortly.schetUid);
        fetchFinishedCases(invoiceShortly.schetUid);
    }
    const handleFinishedCaseClick = (finishedCase: FinishedCase) => {
        setSelectedFinishedCase(finishedCase);

        fetchCases(finishedCase.zSlUid);
    }
    const handleShowServiceClick = () => {
        setShowService(true);
    }
    const handleHideServiceClick = () => {
        setShowService(false);
    }

    const invoicesShortlyIsNotEmpty = invoicesShortly.length > 0;

    return (
        <>
            <RControlControlPanel />
            <div className={styles.container}>
                <div className={styles.column_mo_container}>
                    <div className={styles.title}>Организации</div>
                    <div className={styles.column_mo}>
                        {orgs.map(org => {
                            const isSelected = selectedOrg?.codeMo === org.codeMo;
                            return (
                                <div
                                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                                    onClick={() => handleOrgClick(org)}>
                                    <div className={styles.info_container}>
                                        <label className={styles.label}>{org.codeMo}</label>
                                        <p className={styles.p} title={org.nameMo}>{org.nameMo}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_period_container}>
                    <div className={styles.title}>Периоды</div>
                    <div className={styles.column_period}>
                        {periods.map(period => {
                            const isSelected = selectedPeriod === period;

                            return (
                                <div
                                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                                    onClick={() => handlePeriodClick(period)}>
                                    <div className={styles.info_container}>
                                        <label className={styles.label}>{period.year}</label>
                                        <p className={styles.p}>{monthNames[period.month - 1]}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.column_invoice_shortly}>
                    <div className={styles.title}>Кратко о счетах</div>
                    <div className={`${styles.invoice_shortly_table_container} ${invoicesShortlyIsNotEmpty ? styles.table_is_not_empty : ''}`}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>Статус</th>
                                        <th className={styles.th}>№ счета</th>
                                        <th className={styles.th}>Дата счета</th>
                                        <th className={styles.th}>Сумма, руб.</th>
                                        <th className={styles.th}>Случаев</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoicesShortlyIsNotEmpty ? (
                                        invoicesShortly.map(invoice => {
                                            const isSelected = selectedInvoiceShortlyRecord === invoice;
                                            return (
                                                <tr
                                                    className={`${styles.tr_body} ${isSelected ? styles.selected_invoice_row : ''}`}
                                                    onClick={() => handleInvoiceShortlyClick(invoice)}>
                                                    <td className={styles.td}>{invoice.status}</td>
                                                    <td className={styles.td}>{invoice.nSchet}</td>
                                                    <td className={styles.td}>{dayjs(invoice.dSchet).format('DD.MM.YYYY')}</td>
                                                    <td className={styles.td}>{invoice.summav}</td>
                                                    <td className={styles.td}>{invoice.sdZ ?? "-"}</td>
                                                </tr>
                                            )
                                        })) : (
                                        <tr>
                                            <td colSpan={5} className={styles.empty_data}>Нет данных</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.invoice_shortly_summary} ${invoiceSummary !== null ? styles.active_summary : ''}`}>
                        {invoiceSummary ? (
                            <>
                                <div className={styles.summary_title}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '.5rem'
                                    }}>
                                        <label className={styles.label}>Предъявлено:</label>
                                        <p className={styles.p}>{invoiceSummary.summav} руб.</p>
                                    </div>
                                    {!showServiceInfo ? (
                                        <button
                                            onClick={handleShowServiceClick}
                                            className={styles.button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 15l-7-6l-7 6" />
                                            </svg>

                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleHideServiceClick}
                                            className={styles.button}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6" />
                                            </svg>
                                        </button>

                                    )}
                                </div>
                                <div className={styles.summary_content}>
                                    <div className={styles.tfomsrx_block}>
                                        <div className={styles.card_title}>ТФОМС</div>
                                        <div className={styles.summary_card}>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Принято:</label>
                                                <p className={styles.p}>{invoiceSummary.summap} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято МЭК:</label>
                                                <p className={styles.p}>{invoiceSummary.sankMek} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято МЭЭ:</label>
                                                <p className={styles.p}>{invoiceSummary.sankMee} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято ЭКМР:</label>
                                                <p className={styles.p}>{invoiceSummary.sankEkmp} руб.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.smo_block}>
                                        <div className={styles.card_title}>ОМС</div>
                                        <div className={styles.summary_card}>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Принято:</label>
                                                <p className={styles.p}>{invoiceSummary.smoSummap} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято МЭК:</label>
                                                <p className={styles.p}>{invoiceSummary.smoSankMek} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято МЭЭ:</label>
                                                <p className={styles.p}>{invoiceSummary.smoSankMee} руб.</p>
                                            </div>
                                            <div className={styles.summary_content_card_row}>
                                                <label className={styles.label}>Снято ЭКМР:</label>
                                                <p className={styles.p}>{invoiceSummary.smoSankEkmp} руб.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {showServiceInfo && (
                                    <div className={styles.service_info_container}>
                                        <div className={styles.service_card_row}>
                                            <label className={styles.label}>Имя файла</label>
                                            <p className={styles.p}>{invoiceSummary.filename}</p>
                                        </div>
                                        <div className={styles.service_card_row}>
                                            <label className={styles.label}>UID</label>
                                            <p className={styles.p}>{invoiceSummary.schetUid}</p>
                                        </div>
                                        <div className={styles.service_card_row}>
                                            <label className={styles.label}>Дата загрузки</label>
                                            <p className={styles.p}>{dayjs(invoiceSummary.uploadDate).format('DD.MM.YYYY')}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.summary_waiting}>Ожидает выбора счета</div>
                        )}
                    </div>
                </div>
                <div className={styles.column_main_invoices_block}>
                    <div className={styles.title}>Расширенная информация о счетах</div>
                    <div className={`${styles.finished_cases_table_container} ${selectedInvoiceShortlyRecord !== null ? styles.active_summary : ''}`}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>№ Позиции</th>
                                        <th className={styles.th}>№ Записи</th>
                                        <th className={styles.th}>Фамилия</th>
                                        <th className={styles.th}>Имя</th>
                                        <th className={styles.th}>Отчество</th>
                                        <th className={styles.th}>Усл. ок.</th>
                                        <th className={styles.th}>Серия полиса</th>
                                        <th className={styles.th}>Номер полиса</th>
                                        <th className={styles.th}>Предъявлено</th>
                                        <th className={styles.th}>Принято</th>
                                        <th className={styles.th}>Принято СМО</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finishedCases.length > 0 ? (
                                        finishedCases.map((finished) => {
                                            const isSelected = finished === selectedFinishedCase;

                                            return (
                                                <tr className={`${styles.tr_body} ${isSelected ? styles.selected_invoice_row : ''}`}
                                                    onClick={() => handleFinishedCaseClick(finished)}>
                                                    <td className={styles.td}>{finished.positionNumber}</td>
                                                    <td className={styles.td}>{finished.recordNumber}</td>
                                                    <td className={styles.td}>{finished.surname}</td>
                                                    <td className={styles.td}>{finished.name}</td>
                                                    <td className={styles.td}>{finished.patronymic}</td>
                                                    <td className={styles.td}>{finished.uslOk}</td>
                                                    <td className={styles.td}>{finished.sPolis ?? '-'}</td>
                                                    <td className={styles.td}>{finished.nPolis}</td>
                                                    <td className={styles.td}>{finished.sumv ?? '-'}</td>
                                                    <td className={styles.td}>{finished.sump ?? '-'}</td>
                                                    <td className={styles.td}>{finished.smoSump ?? '-'}</td>
                                                </tr>
                                            )
                                        })) : (
                                        <tr>
                                            <td colSpan={11} className={styles.empty_data}>Нет данных</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.case_table_container} ${selectedFinishedCase !== null ? styles.active_summary : ''}`}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>Профиль</th>
                                        <th className={styles.th}>Дет.</th>
                                        <th className={styles.th}>Специальность</th>
                                        <th className={styles.th}>Начало лечения</th>
                                        <th className={styles.th}>Окончания лечения</th>
                                        <th className={styles.th}>Диагноз</th>
                                        <th className={styles.th}>Количество</th>
                                        <th className={styles.th}>Тариф</th>
                                        <th className={styles.th}>Предъявлено</th>
                                        <th className={styles.th}>Принято</th>
                                        <th className={styles.th}>Принято СМО</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cases.length > 0 ? (
                                        cases.map((generalCase) => {
                                            return (
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>{generalCase.profil}</td>
                                                    <td className={styles.td}>{generalCase.det}</td>
                                                    <td className={styles.td}>{generalCase.prvs}</td>
                                                    <td className={styles.td}>{dayjs(generalCase.startingAt).format("DD.MM.YYYY")}</td>
                                                    <td className={styles.td}>{dayjs(generalCase.endingAt).format("DD.MM.YYYY")}</td>
                                                    <td className={styles.td}>{generalCase.ds1}</td>
                                                    <td className={styles.td}>{generalCase.edCol}</td>
                                                    <td className={styles.td}>{generalCase.tarif}</td>
                                                    <td className={styles.td}>{generalCase.sumM}</td>
                                                    <td className={styles.td}>{generalCase.sump}</td>
                                                    <td className={styles.td}>{generalCase.smoSump}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={11} className={styles.empty_data}>Нет данных</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.categories_container}>
                        <div className={styles.dropdown_menu}>
                            <button className={styles.dropdown_menu_button}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                    <path fill="black" fill-rule="evenodd" d="M42.666 106.667h426.667v42.666H42.666zm0 128H320v42.666H42.666zm426.667 128H42.666v42.666h426.667z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}