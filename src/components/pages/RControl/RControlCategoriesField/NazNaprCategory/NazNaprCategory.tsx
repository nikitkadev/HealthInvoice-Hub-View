import { useRControlCategoriesStore } from '../useRControlCategoriesStore';
import { useNazNaprCategoryData } from './useNazNaprCategoryData';
import styles from './styles.module.scss';
import dayjs from 'dayjs';

const NazNaprCategory = () => {

    const { nazNaprCategoryData } = useRControlCategoriesStore();

    useNazNaprCategoryData();

    return (
        <div className={styles.nazNaprCategoryRoot}>

            <div className={styles.nazTableContainer}>

                <table>

                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Вид назначения</th>
                            <th>Метод диаг. исследования</th>
                            <th>Мед. услуга в направление</th>
                            <th>Дата направления</th>
                            <th>В какую МО</th>
                            <th>Профиль МП</th>
                            <th>Профиль койки</th>
                        </tr>
                    </thead>

                    <tbody>
                        {nazNaprCategoryData?.nazs.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={8}>
                                    Данных не найдено
                                </td>
                            </tr>
                        ) : (
                            nazNaprCategoryData?.nazs.map((naz) => (
                                <tr>
                                    <td>{naz.nazN}</td>
                                    <td>{naz.nazR}</td>
                                    <td>{naz.nazV ?? '-'}</td>
                                    <td>{naz.nazUsl ?? '-'}</td>
                                    <td>{naz.naprDate ? dayjs(naz.naprDate).format('DD.MM.YYYY') : '-'}</td>
                                    <td>{naz.naprMo ?? '-'}</td>
                                    <td>{naz.nazPmp ?? '-'}</td>
                                    <td>{naz.nazPk ?? '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

            <div className={styles.naprTableContainer}>

                <table>

                    <thead>
                        <tr>
                            <th>Медицинская организация</th>
                            <th>Дата направления</th>
                            <th>Вид направления</th>
                            <th>Метод диагностического лечения</th>
                            <th>Мед. услуга в направлении</th>
                        </tr>
                    </thead>

                    <tbody>
                        {nazNaprCategoryData?.naprs.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={5}>
                                    Данных не найдено
                                </td>
                            </tr>
                        ) : (
                            nazNaprCategoryData?.naprs.map(napr => (
                                <tr>
                                    <td>{napr.naprMo ?? '-'}</td>
                                    <td>{dayjs(napr.naprDate).format('DD.MM.YYYY')}</td>
                                    <td>{napr.naprV}</td>
                                    <td>{napr.metIssl ?? '-'}</td>
                                    <td>{napr.naprUsl ?? '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default NazNaprCategory;