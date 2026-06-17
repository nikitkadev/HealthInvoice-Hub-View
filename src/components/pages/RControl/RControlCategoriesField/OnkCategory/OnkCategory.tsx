import dayjs from 'dayjs';
import Field from '../../../../ui/Field/Field';
import OverlayLoader from '../../../../ui/Loaders/OverlayLoader';
import GorizontalSeparator from '../../../../ui/Seporators/GorizontalSeporator';
import { useRControlCategoriesStore } from '../useRControlCategoriesStore';
import styles from './styles.module.scss';
import { useOnkCategoryData } from './useOnkCategoryData';

const OnkCategory = () => {

    const { onkSluch, onkAdditionalInformation, isLoading } = useRControlCategoriesStore();

    useOnkCategoryData();

    return (

        <div className={styles.onkCategoryRoot}>

            <div className={styles.section}>

                <div className={styles.onkSlCard}>

                    <h2>Онкологический случай</h2>

                    <GorizontalSeparator size='xs' type='space' />

                    <Field label="Повод обращения" value={onkSluch?.ds1T ?? '-'} />
                    <Field label="Стадия заболевания" value={onkSluch?.stad ?? '-'} />
                    <Field label='Значение Tumor' value={onkSluch?.onkT ?? '-'} />
                    <Field label='Значение Nodus' value={onkSluch?.onkN ?? '-'} />
                    <Field label="Значение Metastasis" value={onkSluch?.onkM ?? '-'} />
                    <Field label="Признак выявления отдаленных метастазов" value={onkSluch?.mtstz ?? '-'} />

                    <GorizontalSeparator size='xs' type='space' />

                </div>

            </div>

            <div className={styles.section}>

                <div className={styles.onkUslTableContainer}>

                    {isLoading.additional && (<OverlayLoader />)}

                    <table>
                        <thead>

                            <tr>
                                <th>Тип услуги</th>
                                <th>Тип хирургического лечения</th>
                                <th>Линия лек. терапии</th>
                                <th>Профиль тошноты</th>
                                <th>Тип лучевой терапии</th>
                            </tr>

                        </thead>
                        <tbody>
                            {onkAdditionalInformation?.services.length === 0 ? (
                                <tr className={styles.emptyDataRow}>
                                    <td colSpan={5}>Данных не найдено</td>
                                </tr>
                            ) : (
                                onkAdditionalInformation?.services.map(service => (
                                    <tr>
                                        <td>{service.uslTip}</td>
                                        <td>{service.hirTip ?? '-'}</td>
                                        <td>{service.lekTipL ?? '-'}</td>
                                        <td>{service.pptR ?? '-'}</td>
                                        <td>{service.luchTip ?? '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className={styles.section}>

                <div className={styles.bDiagTableContainer}>

                    {isLoading.additional && (<OverlayLoader />)}


                    <table>
                        <thead>

                            <tr>
                                <th>Дата взятия материала</th>
                                <th>Тип диаг. показателя</th>
                                <th>Код диаг. показателя</th>
                                <th>Код результата диагностики</th>
                                <th>Признак получения рез. диаг.</th>
                            </tr>

                        </thead>
                        <tbody>
                            {onkAdditionalInformation?.bDiags.length === 0 ? (
                                <tr className={styles.emptyDataRow}>
                                    <td colSpan={5}>Данных не найдено</td>
                                </tr>
                            ) : (
                                onkAdditionalInformation?.bDiags.map(bDiag => (
                                    <tr>
                                        <td>{bDiag.diagDate ? dayjs(bDiag.diagDate).format('DD.MM.YYYY') : '-'}</td>
                                        <td>{bDiag.diagTip ?? '-'}</td>
                                        <td>{bDiag.diagCode ?? '-'}</td>
                                        <td>{bDiag.diagRslt ?? '-'}</td>
                                        <td>{bDiag.recRslt ?? '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className={styles.section}>

                <div className={styles.dProtTableContainer}>

                    {isLoading.additional && (<OverlayLoader />)}

                    <table>
                        <thead>

                            <tr>
                                <th>Код противопоказания / отказа</th>
                                <th>Дата рег. противопоказания / отказа</th>
                            </tr>

                        </thead>
                        <tbody>
                            {onkAdditionalInformation?.bProts.length === 0 ? (
                                <tr className={styles.emptyDataRow}>
                                    <td colSpan={5}>Данных не найдено</td>
                                </tr>
                            ) : (
                                onkAdditionalInformation?.bProts.map(bProt => (
                                    <tr>
                                        <td>{bProt.prot}</td>
                                        <td>{bProt.dProt ? dayjs(bProt.dProt).format('DD.MM.YYYY') : '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className={styles.section}>

                <div className={styles.lekPrTableContainer}>
                    <table>
                        <thead>

                            <tr>
                                <th>Регистрационный номер лекарственного препарата</th>
                                <th>Схема лекарственной терапии</th>
                            </tr>

                        </thead>
                    </table>
                </div>

            </div>

            <div className={styles.section}>

                <div className={styles.dateInjTableContainer}>
                    <table>
                        <thead>

                            <tr>
                                <th>Дата введения лекарственного препарата</th>
                            </tr>

                        </thead>
                    </table>
                </div>

            </div>

        </div>
    )
};

export default OnkCategory;