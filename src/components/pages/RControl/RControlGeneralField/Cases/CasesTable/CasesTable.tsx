
import { useState } from 'react';
import { useRControlStore } from '../../../useRControlStore';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import useCasesTableData from '../useCasesTableData';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';


const CasesTable = () => {

    const [activeRecord, setActiveRecord] = useState<number | null>(null);
    const { casesData, isLoading, setSelectedCase } = useRControlStore();

    useCasesTableData();

    return (
        <div className={styles.casesTableRoot}>

            {isLoading.cases && (<OverlayLoader />)}

            <table>
                <colgroup>
                    <col style={{ width: '3rem' }} />
                    <col style={{ width: '3rem' }} />
                    <col style={{ width: '3rem' }} />
                    <col style={{ width: '5.5rem' }} />
                    <col style={{ width: '4rem' }} />
                    <col style={{ width: '5.5rem' }} />
                    <col style={{ width: '3rem' }} />
                    <col style={{ width: '5rem' }} />
                    <col style={{ width: '6rem' }} />
                    <col style={{ width: '5rem' }} />
                    <col style={{ width: '5rem' }} />
                    <col style={{ width: '5rem' }} />
                </colgroup>
                <thead className={styles.tableHead}>
                    <tr>
                        <th>SL_UID</th>
                        <th>Профиль</th>
                        <th>Дет.</th>
                        <th>Спец.</th>
                        <th>Лечение с</th>
                        <th>Лечение по</th>
                        <th>Диагноз</th>
                        <th>Кол-во</th>
                        <th>Тариф</th>
                        <th>Предъявлено</th>
                        <th>Принято</th>
                        <th>Принято СМО</th>
                    </tr>
                </thead>
                <tbody>
                    {casesData.length === 0 ? (
                        <tr className={styles.emptyDataRow}>
                            <td colSpan={11}>
                                <span>Данных не найдено</span>
                            </td>
                        </tr>
                    ) : (
                        casesData.map(item => (
                            <tr
                                className={activeRecord === item.uid ? styles.activeRow : ''}
                                onClick={() => {
                                    setSelectedCase(item),
                                        setActiveRecord(item.uid)
                                }}>
                                <td>{item.uid}</td>
                                <td>{item.profil}</td>
                                <td>{item.det}</td>
                                <td>{item.prvs}</td>
                                <td>{dayjs(item.startingAt).format('DD.MM.YYYY')}</td>
                                <td>{dayjs(item.endingAt).format('DD.MM.YYYY')}</td>
                                <td>{item.ds1}</td>
                                <td>{item.edCol ?? '-'}</td>
                                <td>{item.tarif}</td>
                                <td>{item.sumM}</td>
                                <td>{item.sump ?? '-'}</td>
                                <td>{item.smoSump ?? '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default CasesTable;