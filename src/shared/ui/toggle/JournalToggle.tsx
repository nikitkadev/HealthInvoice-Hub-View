import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styles from './JournalToggle.module.css';

interface JournalToggleProps {
    value: number;
    onChange: (value: number) => void;
}

export const JournalToggle = ({
    value,
    onChange }: JournalToggleProps) => {
    const typeClass = value === 1 ? styles.smorx : styles.inogorod;

    return (
        <ToggleButtonGroup
            type="radio"
            name="journal"
            value={value}
            onChange={(val) => onChange(val)}
            className={`${styles.toggleGroup} ${typeClass}`}
        >
            <ToggleButton
                id="smorx"
                value={1}
                variant="outline-primary"
            >
                СМО РХ
            </ToggleButton>
            <ToggleButton
                id="inogorod"
                value={2}
                variant="outline-primary"
            >
                Иногород
            </ToggleButton>
        </ToggleButtonGroup>
    );
};