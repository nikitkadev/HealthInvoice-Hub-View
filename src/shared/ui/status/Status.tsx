import styles from './Status.module.css';
import cn from 'classnames';

export type Status = 'success' | 'error' | 'meta-error' | 'rewriting' | 'waiting' | 'processing' | 'control-error' | 'fatal-error';

interface StatusProps {
    type: Status
    text: string;
}

export const Status = ({
    type,
    text }: StatusProps) => {
    return (
        <div className={cn(
            styles.status,
            styles[`status-${type}`]
        )}>{text}</div>
    )
}