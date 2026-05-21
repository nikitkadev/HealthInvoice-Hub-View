import type { SeparatorProps } from '../SeparatorProps';
import styles from './styles.module.scss';

const GorizontalSeparator = ({
    size = 'xs',
    color = 'var(--gray-150)',
    type = 'space'
}: SeparatorProps) => {
    return (
        <div className={`${styles.separator} ${styles[size]} ${styles[type]}`}
            style={{ borderColor: color }} />
    )
}

export default GorizontalSeparator;