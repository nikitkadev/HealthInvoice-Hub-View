import type { SeparatorProps } from '../SeparatorProps';
import styles from './styles.module.scss';

const VerticalSeparator = ({
    size = 'xs',
    color = 'var(--gray-100)',
    type = 'space'
}: SeparatorProps) => {
    return (
        <div
            className={`${styles.separator} ${styles[size]} ${styles[type]}`}
            style={{ backgroundColor: type === 'line' ? color : 'transparent' }}
        />
    );
};

export default VerticalSeparator;