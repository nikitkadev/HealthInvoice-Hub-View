import { useRControlCategoriesStore } from '../useRControlCategoriesStore';
import Field from '../../../../ui/Field/Field';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import { useKsgVmpCategoryData } from './useKsgVmpCategoryData';

const KsgVmpCategory = () => {

    useKsgVmpCategoryData();
    const { ksgHmpCategoryData } = useRControlCategoriesStore();

    if (!ksgHmpCategoryData) {
        return;
    }

    return (
        <div className={styles.ksgVmpCategoryRoot}>

            <div className={styles.section}>

                <h2>КСГ</h2>

                <div className={styles.ksgCard}>

                    <Field label="КСГ ТФОМС" value={ksgHmpCategoryData.cardData.ksg ?? '-'} />
                    <Field label="КСГ" value={ksgHmpCategoryData.cardData.nKsg} />
                    <Field label='Модель определения КСГ' value={ksgHmpCategoryData.cardData.verKsg} />
                    <Field label='Признак использования подгруппы КСГ' value={ksgHmpCategoryData.cardData.ksgPg ?? '-'} />
                    <Field label="КПГ" value={ksgHmpCategoryData.cardData.nKpg ?? '-'} />
                    <Field label="Коэффициент затратоемкости" value={ksgHmpCategoryData.cardData.koefZ} />
                    <Field label="Управлеченский коэффициент" value={ksgHmpCategoryData.cardData.koefUp} />
                    <Field label="Базовая ставка" value={ksgHmpCategoryData.cardData.bztsz} />
                    <Field label="Коэффициент дифференциации" value={ksgHmpCategoryData.cardData.koefD} />
                    <Field label="Коэффициент уровня / подуровня" value={ksgHmpCategoryData.cardData.koefU} />
                    <Field label="Признак использования КСЛП" value={ksgHmpCategoryData.cardData.slK} />
                    <Field label="Примененный КСЛП" value={ksgHmpCategoryData.cardData.itSl ?? '-'} />

                </div>

                <h2>ВМП</h2>

                <div className={styles.vmpCard}>

                    <Field label="Вид ВМП" value={ksgHmpCategoryData.cardData.vidHmp ?? '-'} />
                    <Field label="Метод ВМП" value={ksgHmpCategoryData.cardData.metodHmp ?? '-'} />
                    <Field label='Дата выдачи талона на ВМП' value={ksgHmpCategoryData.cardData.talD ? dayjs(ksgHmpCategoryData.cardData.talD).format('DD.MM.YYYY') : '-'} />
                    <Field label='Номер талона на ВМП' value={ksgHmpCategoryData.cardData.talNum ?? '-'} />
                    <Field label="Дата планируемой госпитализации" value={ksgHmpCategoryData.cardData.talP ?? '-'} />

                </div>

            </div>

            <div className={styles.section}>
                <div className={styles.tableContainers}>
                    <div className={styles.critTableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Классификационный критерий</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ksgHmpCategoryData.crits.length > 0 ? (
                                    ksgHmpCategoryData.crits.map(item => (
                                        <tr>
                                            <td>{item.crit}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className={styles.emptyDataRow}>
                                        <td colSpan={1}>Данных не найдено</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>

                    <div className={styles.slKoefTableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Номер КСЛП</th>
                                    <th>КСЛП</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ksgHmpCategoryData.slKoefs.length > 0 ? (
                                    ksgHmpCategoryData.slKoefs.map(item => (
                                        <tr>
                                            <td>{item.idSl}</td>
                                            <td>{item.zSl}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className={styles.emptyDataRow}>
                                        <td colSpan={2}>Данных не найдено</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default KsgVmpCategory;