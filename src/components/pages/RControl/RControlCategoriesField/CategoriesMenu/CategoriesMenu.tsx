import { toast } from 'react-toastify';
import { useRControlStore } from '../../useRControlStore';
import styles from './styles.module.scss';
import { type CategoryId } from '../CategoryRenderer/CategoryRenderer';

const CategoriesMenu = () => {

    const {
        setCategory,
        selectedCategory,
        selectedCase } = useRControlStore();

    const showCategory = (category: CategoryId) => {
        if (!selectedCase) {
            toast.info("Выберите случай!");
            return;
        };

        setCategory(category);
    }

    return (
        <div className={styles.categoriesMenuRoot}>

            <div className={styles.menu}>

                <ul>

                    <li
                        className={selectedCategory == 'patient-smo' ? styles.active : ''}
                        onClick={() => showCategory('patient-smo')}>
                        <span>
                            Пациент / СМО
                        </span>
                    </li>

                    <li
                        className={selectedCategory == 'all-cases' ? styles.active : ''}
                        onClick={() => showCategory('all-cases')}>
                        <span>Случай / Законченный случай</span>
                    </li>

                    <li>
                        <span>Онкозаболевания / Консилиум</span>
                    </li>

                    <li className={selectedCategory == 'service' ? styles.active : ''}
                        onClick={() => showCategory('service')}>
                        <span>Услуги</span>
                    </li>

                    <li>
                        <span>КСГ / ВМП</span>
                    </li>

                    <li>
                        <span>Назначения / Направления</span>
                    </li>

                    <li>
                        <span>Дефекты / Санкции СМО</span>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default CategoriesMenu;