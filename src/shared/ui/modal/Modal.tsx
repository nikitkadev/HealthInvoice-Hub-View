import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export type Size = 'small' | 'medium' | 'large';

interface ModalProps {
    size?: Size,
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Modal = ({
    size = 'medium',
    isOpen,
    onClose,
    title,
    children
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div className={styles.backdrop}>
            <div className={`${styles.modal} ${styles[size]}`} ref={modalRef}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" />
                        </svg>
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}