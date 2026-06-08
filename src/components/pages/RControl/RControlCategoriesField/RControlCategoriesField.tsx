import { useRControlStore } from '../useRControlStore';
import CategoriesMenu from './CategoriesMenu';
import CategoryRenderer from './CategoryRenderer/CategoryRenderer';
import styles from './styles.module.scss';

const RControlCategoriesField = () => {

    const { selectedCategory } = useRControlStore();

    return (
        <div className={styles.rControlCategoriesFieldRoot}>

            <div className={styles.header}>
                <h2>Категории</h2>
            </div>

            <CategoriesMenu />

            <div className={styles.content}>
                <CategoryRenderer
                    categoryId={selectedCategory} />
            </div>
        </div>
    )
};

export default RControlCategoriesField;