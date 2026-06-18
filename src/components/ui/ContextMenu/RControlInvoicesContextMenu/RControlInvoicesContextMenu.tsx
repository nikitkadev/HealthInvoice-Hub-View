import type { InvoiceShortly } from '../../../pages/RControl/types';
import GorizontalSeparator from '../../Seporators/GorizontalSeporator';
import styles from './styles.module.scss';

interface RControlInvoicesContextMenuProps {
    visiable: boolean,
    posX: number,
    posY: number,
    invoice?: InvoiceShortly | null;
    sendInvoiceToMEC: () => void;
    fetchInvoices: () => void;
}

const RControlInvoicesContextMenu = ({
    visiable = false,
    posX,
    posY,
    invoice,
    sendInvoiceToMEC,
    fetchInvoices
}: RControlInvoicesContextMenuProps) => {

    if (!visiable) return null;

    return (

        <div
            style={{ top: posY, left: posX }}
            className={styles.rControlInvoiceContextManuRoot}>
            <ul>

                <div className={styles.menuItem}>
                    <span className={styles.menuTitle}>Действия над счетом {invoice?.nSchet}</span>
                </div>

                <li>
                    <button
                        onClick={sendInvoiceToMEC}>
                        <span>Отправить на МЭК</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--black)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m11 11l5-5m0 0l5 5m-5-5v7.803c0 1.118 0 1.677-.218 2.105a2 2 0 0 1-.874.874C14.48 17 13.92 17 12.803 17H3" />
                        </svg>
                    </button>
                </li>

                <li>
                    <button>
                        <span>Просмотреть ошибки</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--black)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m15 7l5 5l-5 5m-6 0l-5-5l5-5" />
                        </svg>
                    </button>
                </li>

                <li>
                    <button>
                        <span className={styles.exitSpan}>Удалить счета</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--error)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m16 16l-4-4m0 0L8 8m4 4l4-4m-4 4l-4 4" />
                        </svg>
                    </button>
                </li>

                <GorizontalSeparator size='xs' type='line' />

                <li>
                    <button
                        onClick={fetchInvoices}>
                        <span>Обновить журнал</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <circle
                                cx="12"
                                cy="12"
                                r="4"
                                fill="none"
                                stroke='var(--black)'
                                stroke-width="1.5" />
                        </svg>
                    </button>
                </li>

            </ul>
        </div>
    )
};

export default RControlInvoicesContextMenu;