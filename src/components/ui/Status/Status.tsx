import { InvoiceStatus } from '../../../app/types/InvoiceStatus';
import styles from './styles.module.scss';

interface StatusProps {
    status: InvoiceStatus;
}

const Status = ({ status }: StatusProps) => {
    const statusConfig: Record<number, { text: string; className: string, color: string }> = {
        [InvoiceStatus.LogicControlError]: { text: "Ошибки", className: styles.error, color: "var(--error)" },
        [InvoiceStatus.FormatControlError]: { text: "Ошибки", className: styles.error, color: "var(--error)" },
        [InvoiceStatus.Fatal]: { text: "Сбой", className: styles.fatalError, color: "var(--black)" },
        [InvoiceStatus.Success]: { text: "Успешно", className: styles.success, color: "var(--success)" },
        [InvoiceStatus.Pending]: { text: "Не проведен", className: styles.pending, color: "var(--pending)" },
        [InvoiceStatus.Rewrite]: { text: "Перезапись", className: styles.rewriting, color: "var(--rewriting)" },
        [InvoiceStatus.NotAllowed]: { text: "Не допущен", className: styles.fatalError, color: "var(--black)" },
        [InvoiceStatus.Processing]: { text: "В процессе", className: styles.processing, color: "var(--processing)" },
    };

    const config = statusConfig[status] || { text: "Неизвестно", className: styles.default, color: "var(--black)" };

    return (
        <div className={`${styles.statusRoot} ${config.className}`}>
            {config.text}
        </div>
    );
};

export default Status;