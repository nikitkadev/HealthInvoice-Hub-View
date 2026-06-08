import { useEffect, useState } from 'react';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader/OverlayLoader';
import styles from './styles.module.scss';
import { useRControlStore } from '../../../useRControlStore';
import useFinishedCasesTableData from './useFinishedCasesTableData';



const FinishedCasesTable = () => {

    const [activeRecord, setActiveRecord] = useState<number | null>(null);
    const { isLoading, finishedCasesData, setSelectedFinishedCase } = useRControlStore();
    const { journalType } = useJournal();

    useFinishedCasesTableData();

    useEffect(() => {
        setActiveRecord(null);
    }, [journalType]);

    return (
        <div className={styles.FinishedCasesTableRoot}>

            {isLoading.finishedCases && <OverlayLoader />}

            <table>

                <colgroup>
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
                        <th>№ поз.</th>
                        <th>№ зап.</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Усл. ок.</th>
                        <th>С. полиса</th>
                        <th>Н. полиса</th>
                        <th>Предъявлено</th>
                        <th>Принято</th>
                        <th>Принято СМО</th>
                    </tr>
                </thead>

                <tbody>

                    {finishedCasesData.length === 0 ? (
                        <tr className={styles.emptyDataRow}>
                            <td colSpan={11}>
                                <span>Данных не найдено</span>
                            </td>
                        </tr>
                    ) : (
                        finishedCasesData.map(item => (
                            <tr
                                className={activeRecord === item.zSlUid ? styles.activeRow : ''}
                                onClick={() => {
                                    setSelectedFinishedCase(item);
                                    setActiveRecord(item.zSlUid);
                                }}>
                                <td>{item.positionNumber}</td>
                                <td>{item.recordNumber}</td>
                                <td>{item.surname}</td>
                                <td>{item.name}</td>
                                <td>{item.patronymic}</td>
                                <td>{item.uslOk}</td>
                                <td>{item.sPolis ?? '-'}</td>
                                <td>{item.nPolis}</td>
                                <td>{item.sumv}</td>
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

export default FinishedCasesTable;