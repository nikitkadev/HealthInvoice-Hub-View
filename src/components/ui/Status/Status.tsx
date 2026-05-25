import styles from './styles.module.scss';

interface StatusProps {
    status: number;
}

const Status = ({ status }: StatusProps) => {
    const statusConfig: Record<number, { text: string; className: string, color: string }> = {
        [-3]: { text: "Не допущен", className: styles.fatalError, color: "var(--black)" },
        [-2]: { text: "Сбой", className: styles.fatalError, color: "var(--black)" },
        [-1]: { text: "Ошибки", className: styles.error, color: "var(--error)" },
        [1]: { text: "Успешно", className: styles.success, color: "var(--success)" },
        [2]: { text: "Не проведен", className: styles.pending, color: "var(--pending)" },
        [3]: { text: "Перезапись", className: styles.rewriting, color: "var(--rewriting)" },
        [4]: { text: "В процессе", className: styles.processing, color: "var(--processing)" },
    };

    const config = statusConfig[status] || { text: "Неизвестно", className: styles.default, color: "var(--black)" };

    return (
        <div className={`${styles.statusRoot} ${config.className}`}>
            {config.text}
        </div>
    );
};

export default Status;