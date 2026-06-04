import PatientCard from "./PatientCard/PatientCard";
import SmoCard from "./SmoCard/SmoCard";
import styles from "./styles.module.scss";

const PatientCategory = () => {
    return (
        <div className={styles.patientCategoryRoot}>
            <PatientCard />
            <SmoCard />
        </div>
    );
};

export default PatientCategory;

