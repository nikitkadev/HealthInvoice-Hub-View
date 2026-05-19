import type { SeporatorProps } from '../SeporatorProps';
import styles from './styles.module.scss';

const GorizontalSeporator = ({
    size = 'xs',
    color = 'var(--default-element-border-color)',
    type = 'space'
}: SeporatorProps) => {
    return (
        <hr className={`${styles.seporator} ${styles[size]} ${styles[type]}`}
            style={{ borderColor: color }} />
    )
}

export default GorizontalSeporator;