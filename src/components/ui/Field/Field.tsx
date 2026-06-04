import styles from './styles.module.scss';

interface FieldProps {
    label: string;
    value: string | number;
}

const Field = ({ label, value }: FieldProps) => (
    <div className={styles.field}>
        <label>{label}</label>
        <span>{value}</span>
    </div>
);

export default Field;