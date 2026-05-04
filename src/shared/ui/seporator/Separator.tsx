import styles from './Separator.module.css';
import cn from 'classnames';

export type SeporatorType = 'line' | 'gradient' | 'space';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Orientation = 'vertical' | 'horizontal'

interface SeparatorProps {
    type?: SeporatorType;
    size?: SpacingSize;
    orientation?: Orientation;
    color?: string;
    className?: string;
}

export const Separator = ({
    type = 'line',
    size = 'md',
    orientation = 'horizontal',
    color,
    className
}: SeparatorProps) => {
    return (
        <div
            className={cn(
                styles.separator,
                styles[`separator-${type}`],
                styles[`size-${size}`],
                styles[`orientation-${orientation}`],
                className
            )}
            style={color ? { background: color } : undefined}
        />
    );
}