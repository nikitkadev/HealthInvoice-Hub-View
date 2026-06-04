import CategoriesMenu from './CategoriesMenu';
import PatientCategory from './PatientCategory/PatientCategory';
import styles from './styles.module.scss';

const RControlCategoriesField = () => {
    return (
        <div className={styles.rControlCategoriesFieldRoot}>
            <CategoriesMenu />
            <PatientCategory />
        </div>
    )
};

export default RControlCategoriesField;