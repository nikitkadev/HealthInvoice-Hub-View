import dayjs from 'dayjs';
import { useRControlCategoriesStore } from '../useRControlCategoriesStore';
import styles from './styles.module.scss';
import { useDeffectsSanksCategoryData } from './useDeffectsSanksCategoryData';

const DeffectsSanksCategory = () => {

    const {
        deffects,
        sanks
    } = useRControlCategoriesStore();

    useDeffectsSanksCategoryData();

    return (
        <div className={styles.deffectsSanksCategoryRoot}>

            <div className={styles.deffectsTableContainer}>
                <table>
                    <colgroup>
                        <tr style={{ width: '1rem' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deffects.length > 0 ? (
                            deffects.map(item => (
                                <tr>
                                    <td>{item.kod}</td>
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
                        {sanks.length > 0 ? (
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