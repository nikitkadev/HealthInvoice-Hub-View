import type React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    onClick?: (e: React.MouseEvent) => void;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const Checkbox = ({
    onClick,
    checked,
    onChange,
    disabled = false
}: CheckboxProps) => {
    return (
        <label
            className={`${styles.checkbox} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
            style={{
                cursor: 'pointer'
            }}>
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
}