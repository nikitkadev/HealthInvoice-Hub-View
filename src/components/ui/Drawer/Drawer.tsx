import type React from 'react';
import styles from './styles.module.scss';
import Button from '../Button/Button';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Drawer = ({
    isOpen,
    onClose,
    children,
    title
}: DrawerProps) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.drawerRoot}
                onClick={(e) => e.stopPropagation()}>
                <div className={styles.drawerHeader}>
                    <h1>
                        {title}
                    </h1>
                    <Button
                        variant='icon'
                        onClick={onClose}
                        fullWidth={false}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--black)"
                                stroke-linecap="round"
                                stroke-width="2.5"
                                d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" />
                        </svg>
                    </Button>
                </div>
                {children}
            </div>
        </div>
    )
};

export default Drawer;