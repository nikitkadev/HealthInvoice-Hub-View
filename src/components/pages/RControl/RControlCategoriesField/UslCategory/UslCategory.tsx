import styles from './styles.module.scss';
import useUslCategoryData from './useUslCategoryData';
import dayjs from 'dayjs';
import { useRControlCategoriesStore } from '../useRControlCategoriesStore';

const UslCategory = () => {

    useUslCategoryData();

    const {
        services,
        medDevs,
        setSelectedService } = useRControlCategoriesStore();

    return (
        <div className={styles.uslCategoryRoot}>

            <div className={styles.uslTableContainer}>
                <table>

                    <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Вид мед. вмешательства</th>
                            <th>Профиль</th>
                            <th>Специальность</th>
                            <th>Признак "Детский"</th>
                            <th>Дата с</th>
                            <th>Дата по</th>
                            <th>Диагноз</th>
                            <th>Количество</th>
                            <th>Тариф</th>
                            <th>Сумма</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={12}>
                                    Данных не найдено
                                </td>
                            </tr>
                        ) : (
                            services.map(service => (
                                <tr
                                    onClick={() => setSelectedService(service)}>

                                    <td>{service.codeUsl}</td>
                                    <td>{service.vidVme ?? '-'}</td>
                                    <td>{service.profil}</td>
                                    <td>{service.prvs}</td>
                                    <td>{service.det}</td>
                                    <td>{dayjs(service.dateIn).format('DD.MM.YYYY')}</td>
                                    <td>{dayjs(service.dateOut).format('DD.MM.YYYY')}</td>
                                    <td>{service.ds}</td>
                                    <td>{service.kolUsl}</td>
                                    <td>{service.tarif ?? '-'}</td>
                                    <td>{service.sumvUsl}</td>
                                    <td>{service.comentu ?? '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.medDevTableContainer}>
                <table>

                    <thead>
                        <tr>
                            <th>Дата установки медицинского изделия</th>
                            <th>Код вида медицинского изделия</th>
                            <th>Серийный номер / маркировочный код</th>
                        </tr>
                    </thead>

                    <tbody>
                        {medDevs.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={3}>
                                    Данных не найдено
                                </td>
                            </tr>
                        ) : (
                            medDevs.map(dev => (
                                <tr>
                                    <td>{dayjs(dev.medDate).format('DD.MM.YYYY')}</td>
                                    <td>{dev.codeMedDev}</td>
                                    <td>{dev.seriesNumber}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default UslCategory;