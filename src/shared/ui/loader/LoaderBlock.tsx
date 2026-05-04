import styles from './LoaderBlock.module.css';
import { LottieLoader } from './LottieLoader';


export type LoaderSize = 'small' | 'medium' | 'large';

interface LoaderProps {
    text?: string;
    size?: LoaderSize
}

export const LoaderBlock = ({
    text = 'Загрузка...',
    size = 'medium'
}: LoaderProps) => {
    const loaderClass = `${styles.loader}`;

    return (
        <div className={loaderClass}>
            <LottieLoader size={size === 'small' ? 250 : (size === 'medium' ? 300 : 350)} />
            {text && <p className={styles.text}>{text}</p>}
        </div>
    )
}