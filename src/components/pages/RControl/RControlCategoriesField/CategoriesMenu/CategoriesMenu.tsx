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
                        <span>
                            Случай / Законченный случай
                        </span>
                    </li>

                    <li
                        className={selectedCategory == 'onk' ? styles.active : ''}
                        onClick={() => showCategory('onk')}>
                        <span>Онкозаболевания / Консилиум</span>
                    </li>

                    <li className={selectedCategory == 'service' ? styles.active : ''}
                        onClick={() => showCategory('service')}>
                        <span>
                            Услуги
                        </span>
                    </li>

                    <li className={selectedCategory == 'ksg-vmp' ? styles.active : ''}
                        onClick={() => showCategory('ksg-vmp')}>
                        <span>
                            КСГ / ВМП
                        </span>
                    </li>

                    <li className={selectedCategory == 'naz-napr' ? styles.active : ''}
                        onClick={() => showCategory('naz-napr')}>
                        <span>
                            Назначения / Направления
                        </span>
                    </li>

                    <li className={selectedCategory == 'deffects-sanks' ? styles.active : ''}
                        onClick={() => showCategory('deffects-sanks')}>
                        <span>
                            Дефекты / Санкции СМО
                        </span>
                    </li>

                </ul>
            </div>
        </div >
    );
};

export default CategoriesMenu;