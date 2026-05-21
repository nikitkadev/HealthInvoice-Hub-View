import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import styles from './styles.module.scss';

interface JournalTypeToggleProps {
    value: number;
    onChange: (value: number) => void;
}

const JournalTypeToggle = ({
    value,
    onChange
}: JournalTypeToggleProps) => {
    return (
        <ToggleButtonGroup
            type="radio"
            name="journalType"
            value={value}
            onChange={onChange}
            className={`${styles.toggleGroup}`}
        >
            <ToggleButton
                id="smorx"
                value={1}
                variant="outline-primary"
                className={styles.firstChild}
            >
                СМО РХ
            </ToggleButton>
            <ToggleButton
                id="inogorod"
                value={2}
                variant="outline-primary"
                className={styles.lastChild}
            >
                Иногород
            </ToggleButton>
        </ToggleButtonGroup>
    )
};

export default JournalTypeToggle;