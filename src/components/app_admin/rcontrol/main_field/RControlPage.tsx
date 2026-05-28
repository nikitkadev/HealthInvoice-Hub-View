import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../shared/api/ApiClient';
import { useJournal } from '../../../../app/contexts/JournalTypeContext';
import { RControlControlPanel } from '../control_panel/RControlControlPanel';
import { CategoryRenderer } from '../categories/renderer/CategoryRenderer';

import dayjs from 'dayjs';
import styles from './RControlPage.module.css';

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

type CategoryId = 'patient' | 'cases' | 'covid' | 'oncology' | 'concilium';

export const RControlPage = () => {
    const { journalType } = useJournal();
    const categoriesMenuRef = useRef<HTMLDivElement>(null);

    const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
    const [invoicesShortly, setInvoiceShortly] = useState<InvoiceShortly[]>([]);
    const [invoiceSummary, setInvoiceSummary] = useState<InvoiceSummary | null>(null);
    const [finishedCases, setFinishedCases] = useState<FinishedCase[]>([]);
    const [cases, setCases] = useState<Case[]>([]);
    const [selectedInvoiceShortlyRecord, setSelectedInvoiceShortlyRecord] = useState<InvoiceShortly | null>(null);
    const [selectedFinishedCase, setSelectedFinishedCase] = useState<FinishedCase | null>(null);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [isCaseFetching, setIsCaseFetching] = useState(false);
    const [isFinishedCaseFetching, setIsFinishedCaseFetching] = useState(false);
    const [isCategoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [conextMenu, setConextMenu] = useState<{
        visiable: boolean,
        posX: number
        posY: number
    }>({
        visiable: false,
        posX: 0,
        posY: 0
    })

    useEffect(() => {
        const handleClickOutside = () => {
            closeContextMenu();
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeContextMenu();
            };
        };

        if (conextMenu.visiable) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [conextMenu.visiable]);

    const closeContextMenu = () => setConextMenu(prev => ({ ...prev, visiable: false }))

    const handleClickOnContextMenuArea = (e: React.MouseEvent) => {

        e.preventDefault();

        setConextMenu({
            visiable: true,
            posX: e.clientX,
            posY: e.clientY
        });
    }

    const handleApplyFilters = async (codeMo: string, year: string, month: string) => {

        resetData({
            resetAll: true
        });

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

        setIsFinishedCaseFetching(true);
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
        finally {
            setIsFinishedCaseFetching(false);
        }
    }

    const fetchCases = async (zSlUid: number) => {

        setIsCaseFetching(true);
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
        finally {
            setIsCaseFetching(false);
        }
    }

    const handleInvoiceShortlyClick = (invoiceShortly: InvoiceShortly) => {

        resetData({
            resetInvoiceSummary: true,
            resetFinishedCases: true,
            resetCases: true,
            removeCaseSelected: true,
            removeFinishedCaseSelected: true
        });

        setSelectedInvoiceShortlyRecord(invoiceShortly);
        fetchInvoiceSummary(invoiceShortly.schetUid);
        fetchFinishedCases(invoiceShortly.schetUid);
    }

    const handleFinishedCaseClick = (finishedCase: FinishedCase) => {

        resetData({
            resetCases: true,
            removeCaseSelected: true
        })

        setSelectedFinishedCase(finishedCase);
        fetchCases(finishedCase.zSlUid);
    }

    const resetData = ({
        resetAll = false,
        resetInvoiceShortly = false,
        resetInvoiceSummary = false,
        resetFinishedCases = false,
        resetCases = false,
        removeInvoiceShortlySelected = false,
        removeFinishedCaseSelected = false,
        removeCaseSelected = false
    } = {}) => {

        if (resetAll) {
            setInvoiceShortly([]);
            setInvoiceSummary(null);
            setFinishedCases([]);
            setCases([]);
            setSelectedInvoiceShortlyRecord(null);
            setSelectedFinishedCase(null);
            setSelectedCase(null);
            return;
        }

        if (resetInvoiceShortly) setInvoiceShortly([]);
        if (resetInvoiceSummary) setInvoiceSummary(null);
        if (resetFinishedCases) setFinishedCases([]);
        if (resetCases) setCases([]);

        if (removeInvoiceShortlySelected) setSelectedInvoiceShortlyRecord(null);
        if (removeFinishedCaseSelected) setSelectedFinishedCase(null);
        if (removeCaseSelected) setSelectedCase(null);
    };

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

    useEffect(() => {
        setActiveCategory(null);
        resetData({
            resetAll: true
        })
    }, [journalType]);

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
                                        <label className={styles.label}>Предъявлено - {invoiceSummary.summav} руб.</label>
                                    </div>
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
                            </>
                        ) : (
                            <div className={styles.summary_waiting}>Ожидает выбора счета</div>
                        )}
                    </div>
                </div>
                <div className={styles.column_main_invoices_block}>
                    <div className={styles.title}>Расширенная информация о счетах</div>
                    <div className={`${styles.finished_cases_table_container} ${finishedCases.length > 0 ? styles.active_summary : ''}`}>
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
                                        })) : isFinishedCaseFetching ?

                                        (
                                            <tr>
                                                <td colSpan={12} className={styles.empty_data}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px'
                                                    }}>
                                                        Фетчим кейсы законченные
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12">
                                                                <animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate" />
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td colSpan={12} className={styles.empty_data}>Нет данных</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.case_table_container} ${cases.length > 0 ? styles.active_summary : ''}`}>
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
                                            const isSelected = generalCase === selectedCase;
                                            return (
                                                <tr className={`${styles.tr_body} ${isSelected ? styles.selected_invoice_row : ''}`}
                                                    onClick={() => setSelectedCase(generalCase)}>
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
                                                    <td className={styles.td}>{generalCase.smoSump ?? "-"}</td>
                                                </tr>
                                            )
                                        })
                                    ) : isCaseFetching ? (
                                        <tr>
                                            <td colSpan={11} className={styles.empty_data}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}>
                                                    Загружаем грязючные случаи
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12">
                                                            <animateTransform attributeName="transform" attributeType="XML" dur="560ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate" />
                                                        </path>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan={11} className={styles.empty_data}>
                                                Нет данных
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.categories_container} ${activeCategory !== null ? styles.active_summary : ''}`}>
                        <div className={styles.categories_container_header}>
                            <div className={styles.context_menu_zone}
                                onContextMenu={handleClickOnContextMenuArea}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                    <g fill="none" stroke="#8a8a8a" stroke-width="1.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.992 9.5h.01M14.5 5h.01" />
                                        <path stroke-linecap="round" d="M14.625 5H15a4 4 0 0 1 4 4v.375" />
                                        <path d="M9.375 5H9a4 4 0 0 0-4 4v.375" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.373 5h.01M5 9.5h.01" />
                                        <path d="M9.375 19H9a4 4 0 0 1-4-4v-.375" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.373 19h.01M5 14.55h.01" />
                                        <path stroke-linecap="round" d="M16 13v3m0 3v-3m3 0h-3m0 0h-3" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        {activeCategory && (
                            <CategoryRenderer categoryId={activeCategory} />
                        )}
                        {conextMenu.visiable && (
                            <div
                                className={styles.categories_menu}
                                style={{
                                    left: conextMenu.posX,
                                    top: conextMenu.posY
                                }}>
                                {selectedCase ? (
                                    <ul>
                                        <li>
                                            <button
                                                onClick={() => setActiveCategory('patient')}>
                                                Пациент / СМО
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveCategory('cases')}>
                                                Случаи
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveCategory('covid')}>
                                                Covid
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveCategory('oncology')}>
                                                Онкозаболевания
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveCategory('concilium')}>
                                                Консилиум
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <button>
                                                Услуги
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                        </li>
                                        <li>
                                            <button>
                                                Дополнительно
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                ) : (
                                    <div style={{
                                        padding: '1rem'
                                    }}>Ну ты бык, не?</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div >

    )
}