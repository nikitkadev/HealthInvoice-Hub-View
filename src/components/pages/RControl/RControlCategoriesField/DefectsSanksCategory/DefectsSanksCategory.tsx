import { useRControlCategoriesStore } from '../useRControlCategoriesStore';
import { useDefectsSanksCategoryData } from './useDefectsSanksCategoryData';
import styles from './styles.module.scss';
import dayjs from 'dayjs';

const DeffectsSanksCategory = () => {

    const {
        defects,
        sanks
    } = useRControlCategoriesStore();

    useDefectsSanksCategoryData();

    return (
        <div className={styles.defectsSanksCategoryRoot}>

            <div className={styles.defectsTableContainer}>
                <table>
                    <colgroup>
                        <col style={{ width: '1.5rem' }} />
                        <col style={{ width: '20rem' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defects?.length > 0 ? (
                            defects.map(item => (
                                <tr>
                                    <td>{item.kod ?? '-'}</td>
                                    <td>{item.comment}</td>
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

            <div className={styles.sanksTableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>Сумма</th>
                            <th>Количество</th>
                            <th>Тип санкции</th>
                            <th>Код причины отказа</th>
                            <th>Номер акта</th>
                            <th>Дата акта</th>
                            <th>Комментарий</th>
                            <th>Имя файла</th>
                            <th>Год</th>
                            <th>Месяц</th>
                            <th>Дата выгрузки</th>
                            <th>Код врача</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sanks?.length > 0 ? (
                            sanks.map(item => (
                                <tr>
                                    <td>{item.uid}</td>
                                    <td>{item.sSum}</td>
                                    <td>{item.sEdCol}</td>
                                    <td>{item.sTip}</td>
                                    <td>{item.sOsn}</td>
                                    <td>{item.numAct}</td>
                                    <td>{dayjs(item.dateAct).format('DD.MM.YYYY')}</td>
                                    <td>{item.sCom ?? '-'}</td>
                                    <td>{item.filename ?? '-'}</td>
                                    <td>{item.year ?? '-'}</td>
                                    <td>{item.month ?? '-'}</td>
                                    <td>{item.uploaddate ? dayjs(item.uploaddate).format('DD.MM.YYYY') : '-'}</td>
                                    <td>{item.codeExp ?? '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={13}>Данных не найдено</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default DeffectsSanksCategory;