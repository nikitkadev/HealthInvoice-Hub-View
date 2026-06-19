
import { useEffect, useState } from 'react';
import useInvoicesTableData from './useInvoicesTableData';
import { useRControlStore } from '../../../useRControlStore';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import Status from '../../../../../ui/Status';
import RControlInvoicesContextMenu from '../../../../../ui/ContextMenu/RControlInvoicesContextMenu';
import type { InvoiceShortly } from '../../../types';
import { toast } from 'react-toastify';
import { InvoiceStatus } from '../../../../../../app/types/InvoiceStatus';
import { api } from '../../../../../../shared/api/ApiClient';


const InvoicesTable = () => {
    const { fetchShortlyInvoices } = useInvoicesTableData();
    const [activeInvoice, setActiveInvoice] = useState<number | null>(null);
    const {
        setSelectedInvoice,
        isLoading,
        invoicesData,
        setLoading } = useRControlStore();
    const { journalType } = useJournal();

    const [contextMenu, setContextMenu] = useState<{
        visiable: boolean;
        posX: number;
        posY: number;
        record?: InvoiceShortly | null;
    }>({
        visiable: false,
        posX: 0,
        posY: 0
    });

    const openContextMenu = (e: React.MouseEvent, selected: InvoiceShortly) => {

        e.preventDefault();
        e.stopPropagation();

        setContextMenu({
            visiable: true,
            posX: e.clientX,
            posY: e.clientY,
            record: selected
        });
    };

    const closeContextMenu = () => {

        setContextMenu({
            visiable: false,
            posX: 0,
            posY: 0,
            record: null
        });
    }

    const sendInvoiceToMEC = async () => {

        try {

            if (!contextMenu.record) {
                toast.error("Нечего отправить не МЭК!");
                return;
            }

            if (contextMenu.record.statusMEK === InvoiceStatus.Processing) {
                toast.warning("Счет уже проходит МЭК!");
                return;
            }

            const schetUids: Array<number> = [contextMenu.record.schetUid]

            await api.postWithoutContent('/invoices/logic-control', {
                schetUids: schetUids,
                journalType: journalType
            });

            fetchShortlyInvoices();

            toast.success("Счет отправлен на МЭК!");

        }
        catch (error) {
            console.debug(error);
        }

    };

    const removeInvoices = async () => {

        setLoading('invoices', true);

        try {

            if (!contextMenu.record) {
                toast.error("Невозможно удалить счет!");
                return;
            }

            if (contextMenu.record.statusMEK === InvoiceStatus.Processing) {
                toast.warning("Счет не удален - проходит МЭК!");
                return;
            }

            const schetUids: Array<number> = [contextMenu.record.schetUid]

            await api.postWithoutContent('/invoices/remove', {
                schetUids: schetUids,
                journalType: journalType
            });

            fetchShortlyInvoices();


            toast.success("Счета удалены!");
        }
        catch {
            toast.error("Произошла ошибка при удаление счетов!");
        }
        finally {
            setLoading('invoices', false);
        }
    };

    const viewDefects = async () => {

        if (!contextMenu.record) {
            toast.error("Нечего отправить не МЭК!");
            return;
        }

        if (contextMenu.record.statusMEK === InvoiceStatus.Processing) {
            toast.warning("Счет уже проходит МЭК!");
            return;
        }

        window.open(`/errors/${contextMenu.record.schetUid}?journalType=${journalType}`, '_blank');
    };




    useEffect(() => {
        setActiveInvoice(null);
    }, [journalType]);

    useEffect(() => {
        document.addEventListener('click', closeContextMenu);

        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    }, []);

    return (
        <>
            <div className={styles.InvoicesTableRoot}>

                {isLoading.invoices && (<OverlayLoader />)}

                <table>
                    <colgroup>
                        <col style={{ width: '2.5rem' }} />
                        <col style={{ width: '1.5rem' }} />
                        <col style={{ width: '1.5rem' }} />
                        <col style={{ width: '1.5rem' }} />
                        <col style={{ width: '1rem' }} />
                        <col style={{ width: '2.5rem' }} />
                    </colgroup>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>№ счета</th>
                            <th>Дата счета</th>
                            <th>Сумма, руб.</th>
                            <th>Случаев</th>
                            <th>Статус</th>
                            <th className={styles.thCenter}>Статус МЭК</th>
                        </tr>
                    </thead>

                    <tbody>

                        {invoicesData.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={6}>
                                    <span>Данных не найдено</span>
                                </td>
                            </tr>
                        ) : (
                            invoicesData.map(item => (
                                <tr
                                    className={activeInvoice === item.schetUid ? styles.activeRow : ''}
                                    onClick={() => {
                                        setSelectedInvoice(item)
                                        setActiveInvoice(item.schetUid)
                                    }}
                                    onContextMenu={(e) => openContextMenu(e, item)}
                                >
                                    <td>{item.nSchet}</td>
                                    <td>{dayjs(item.dSchet).format('DD.MM.YYYY')}</td>
                                    <td>{item.summav}</td>
                                    <td>{item.sdZ}</td>
                                    <td>{item.status}</td>
                                    <td className={styles.tdCenter}>
                                        <Status status={item.statusMEK} />
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            <RControlInvoicesContextMenu
                visiable={contextMenu.visiable}
                posX={contextMenu.posX}
                posY={contextMenu.posY}
                invoice={contextMenu.record}
                sendInvoiceToMEC={sendInvoiceToMEC}
                fetchInvoices={fetchShortlyInvoices}
                removeInvoices={removeInvoices}
                viewDefects={viewDefects}
            />
        </>

    );

};

export default InvoicesTable;