import type React from 'react';
import styles from './styles.module.scss';

interface CheckboxProps {
    onClick?: (e: React.MouseEvent) => void;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const Checkbox = ({
    onClick,
    checked,
    onChange,
    disabled = false
}: CheckboxProps) => {
    return (
        <label
            className={`${styles.checkbox} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={styles.input}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};

export default Checkbox;