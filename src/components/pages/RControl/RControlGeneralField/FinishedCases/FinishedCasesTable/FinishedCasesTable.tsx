import type { FinishedCase } from '../../../types';

import { useEffect, useState } from 'react';
import { useJournal } from '../../../../../../app/contexts/JournalTypeContext';

import DefaultLoader from '../../../../../ui/Loaders/DefaultLoader';

import styles from './styles.module.scss';

interface FinishedCasesTableProps {
    isLoading: boolean;
    data: FinishedCase[];
    fetchCases: (zSlUid: number) => void;
}

const FinishedCasesTable = ({
    isLoading,
    data,
    fetchCases }: FinishedCasesTableProps) => {

    const [activeRecord, setActiveRecord] = useState<number | null>(null);

    const { journalType } = useJournal();

    useEffect(() => {
        setActiveRecord(null);
    }, [journalType])

    const mockRecords: JournalRecord[] = [
        {
            zSlUid: 1,
            positionNumber: 1,
            recordNumber: 'REC-000001',
            surname: 'Иванов',
            name: 'Иван',
            patronymic: 'Иванович',
            uslOk: 'Лечение',
            sPolis: 'ОМС',
            nPolis: '7700123456789012',
            sumv: 1250.5,
            sump: 1000,
            smoSump: 250.5,
        },
        {
            zSlUid: 2,
            positionNumber: 2,
            recordNumber: 'REC-000002',
            surname: 'Петров',
            name: 'Петр',
            patronymic: 'Алексеевич',
            uslOk: 'Диагностика',
            sPolis: 'ОМС',
            nPolis: '7700123456789013',
            sumv: 3500,
            sump: 3000,
            smoSump: 500,
        },
        {
            zSlUid: 3,
            positionNumber: 3,
            recordNumber: 'REC-000003',
            surname: 'Сидоров',
            name: 'Андрей',
            patronymic: 'Викторович',
            uslOk: 'Стационар',
            sPolis: 'ДМС',
            nPolis: '7700123456789014',
            sumv: 15780.25,
            sump: 12000,
            smoSump: 3780.25,
        },
        {
            zSlUid: 4,
            positionNumber: 4,
            recordNumber: 'REC-000004',
            surname: 'Кузнецова',
            name: 'Мария',
            patronymic: 'Сергеевна',
            uslOk: 'Консультация',
            sPolis: undefined,
            nPolis: '7700123456789015',
            sumv: 890,
            sump: undefined,
            smoSump: undefined,
        },
        {
            zSlUid: 5,
            positionNumber: 5,
            recordNumber: 'REC-000005',
            surname: 'Смирнов',
            name: 'Дмитрий',
            patronymic: 'Павлович',
            uslOk: 'Операция',
            sPolis: 'ОМС',
            nPolis: '7700123456789016',
            sumv: 45200,
            sump: 40000,
            smoSump: 5200,
        },
        {
            zSlUid: 6,
            positionNumber: 6,
            recordNumber: 'REC-000006',
            surname: 'Орлова',
            name: 'Елена',
            patronymic: 'Николаевна',
            uslOk: 'Реабилитация',
            sPolis: 'ДМС',
            nPolis: '7700123456789017',
            sumv: 6200,
            sump: 5000,
            smoSump: 1200,
        },
        {
            zSlUid: 7,
            positionNumber: 7,
            recordNumber: 'REC-000007',
            surname: 'Федоров',
            name: 'Алексей',
            patronymic: 'Игоревич',
            uslOk: 'Амбулаторно',
            sPolis: 'ОМС',
            nPolis: '7700123456789018',
            sumv: 1450,
            sump: 1200,
            smoSump: 250,
        },
        {
            zSlUid: 8,
            positionNumber: 8,
            recordNumber: 'REC-000008',
            surname: 'Васильева',
            name: 'Ольга',
            patronymic: 'Петровна',
            uslOk: 'Обследование',
            sPolis: undefined,
            nPolis: '7700123456789019',
            sumv: 2750,
            sump: undefined,
            smoSump: undefined,
        },
    ];

    return (
        <div className={styles.FinishedCasesTableRoot}>
            <div className={styles.tableContainer}>
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

                        {isLoading ? (
                            <tr className={styles.loaderRow}>
                                <td colSpan={11} className={styles.loaderCell}>
                                    <DefaultLoader />
                                </td>
                            </tr>
                        ) : mockRecords.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={11}>
                                    <span>Данных не найдено</span>
                                </td>
                            </tr>
                        ) : (
                            mockRecords.map(item => (
                                <tr
                                    className={activeRecord === item.zSlUid ? styles.activeRow : ''}
                                    onClick={() => {
                                        fetchCases(item.zSlUid)
                                        setActiveRecord(item.zSlUid)
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
        </div>
    )
};

export default FinishedCasesTable;