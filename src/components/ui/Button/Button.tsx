import type React from "react";
import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'icon';
    fullWidth?: boolean;
}

const Button = ({
    variant = 'primary',
    fullWidth = true,
    children,
    type = 'button',
    ...rest

}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
            {...rest}>
            {children}
        </button>
    )
}

export default Button;