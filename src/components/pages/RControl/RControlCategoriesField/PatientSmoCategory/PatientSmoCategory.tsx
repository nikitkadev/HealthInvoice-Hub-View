import PatientCard from "./PatientCard/PatientCard";
import SmoCard from "./SmoCard/SmoCard";
import styles from "./styles.module.scss";

const PatientSmoCategory = () => {
    return (
        <div className={styles.patientSmoCategoryCategoryRoot}>
            <PatientCard />
            <SmoCard />
        </div>
    );
};

export default PatientSmoCategory;

