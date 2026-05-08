import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../shared/api/ApiClient';
import { useJournal } from '../../../app_lk_journal/general/JournalContext';
import dayjs from 'dayjs';
import styles from './RControlPage.module.css';
import { RControlControlPanel } from '../control_panel/RControlControlPanel';
import { Separator } from '../../../../shared/ui/seporator/Separator';

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
    const [invoicesShortly, setInvoiceShortly] = useState<InvoiceShortly[]>([]);
    const [finishedCases, setFinishedCases] = useState<FinishedCase[]>([]);
    const [cases, setCases] = useState<Case[]>([]);
    const [selectedInvoiceShortlyRecord, setSelectedInvoiceShortlyRecord] = useState<InvoiceShortly | null>(null);
    const [selectedFinishedCase, setSelectedFinishedCase] = useState<FinishedCase | null>(null);
    const [invoiceSummary, setInvoiceSummary] = useState<InvoiceSummary | null>(null);
    const [showServiceInfo, setShowService] = useState(false);

    const [isCategoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const categoriesMenuRef = useRef<HTMLDivElement>(null);


    const { journalType } = useJournal();


    const handleApplyFilters = async (codeMo: string, year: string, month: string) => {

        setInvoiceShortly([]);
        setFinishedCases([]);
        setCases([]);
        setInvoiceSummary(null);

        try {
            const response = await api.get<InvoiceShortly[]>('/admin/rcontrol/invoices_shortly', {
                codeMo,
                year,
                month,
                journalType: journalType.toString()
            });

            if (response) {
                setInvoiceShortly(response);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

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
    const toggleMenu = () => setCategoriesMenuOpen(!isCategoriesMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) {
                setCategoriesMenuOpen(false);
            }
        };

        if (isCategoriesMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCategoriesMenuOpen]);

    const invoicesShortlyIsNotEmpty = invoicesShortly.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.panel_container}>
                <RControlControlPanel
                    onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.output_container}>
                <div className={styles.column_invoice_shortly}>
                    <div className={styles.title}>Кратко о счетах</div>
                    <div className={`${styles.invoice_shortly_table_container} ${invoicesShortlyIsNotEmpty ? styles.table_is_not_empty : ''}`}>
                        <table className={styles.table}>
                            <colgroup>
                                <col style={{ width: '18px' }} />
                                <col style={{ width: '16px' }} />
                                <col style={{ width: '20px' }} />
                                <col style={{ width: '14px' }} />
                                <col style={{ width: '12px' }} />
                            </colgroup>
                            <thead className={styles.thead}>
                                <tr className={styles.tr}>
                                    <th className={styles.th}>№ счета</th>
                                    <th className={styles.th}>Дата счета</th>
                                    <th className={styles.th}>Сумма, руб.</th>
                                    <th className={styles.th}>Случаев</th>
                                    <th className={styles.th}>Статус</th>
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
                                                <td
                                                    title={invoice.nSchet}
                                                    className={styles.td}>{invoice.nSchet}</td>
                                                <td className={styles.td}>{dayjs(invoice.dSchet).format('DD.MM.YYYY')}</td>
                                                <td className={styles.td}>{invoice.summav}</td>
                                                <td className={styles.td}>{invoice.sdZ ?? "-"}</td>
                                                <td className={styles.td}>{invoice.status}</td>
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
                                <colgroup>
                                    <col style={{ width: '6px' }} />
                                    <col style={{ width: '10px' }} />
                                    <col style={{ width: '10px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '8px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                </colgroup>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>№</th>
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
                                        finishedCases.map((finished, index) => {
                                            const isSelected = finished === selectedFinishedCase;

                                            return (
                                                <tr className={`${styles.tr_body} ${isSelected ? styles.selected_invoice_row : ''}`}
                                                    onClick={() => handleFinishedCaseClick(finished)}>
                                                    <td className={styles.td}>{index + 1}</td>
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
                                            <td colSpan={12} className={styles.empty_data}>Нет данных</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.case_table_container} ${selectedFinishedCase !== null ? styles.active_summary : ''}`}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <colgroup>
                                    <col style={{ width: '8px' }} />
                                    <col style={{ width: '6px' }} />
                                    <col style={{ width: '10px' }} />
                                    <col style={{ width: '10px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '8px' }} />
                                    <col style={{ width: '8px' }} />
                                    <col style={{ width: '8px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                    <col style={{ width: '12px' }} />
                                </colgroup>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>Профиль</th>
                                        <th className={styles.th}>Дет.</th>
                                        <th className={styles.th}>Специальность</th>
                                        <th className={styles.th}>Начало лечения</th>
                                        <th className={styles.th}>Окончание лечения</th>
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
                        <div className={styles.categories_container_header}>
                            <span>Выберите любую категорию</span>
                            <button
                                onClick={toggleMenu}
                                className={styles.dropdown_menu_button}>
                                Выбрать
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9 7h10M9 12h10M9 17h10M5 17h-.01M5 12h-.01M5 7h-.01" />
                                </svg>
                            </button>
                            {isCategoriesMenuOpen && (

                                <div ref={categoriesMenuRef}
                                    className={styles.categories_menu}>
                                    <ul>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Пациент / СМО
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Случаи
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Covid
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Онкозаболевания
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Консилиум
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Услуги
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <Separator type='line' orientation='horizontal' size='xs' color="var(--border-light-menu-context)" />
                                        </li>
                                        <li>
                                            <button
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Дополнительно
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}