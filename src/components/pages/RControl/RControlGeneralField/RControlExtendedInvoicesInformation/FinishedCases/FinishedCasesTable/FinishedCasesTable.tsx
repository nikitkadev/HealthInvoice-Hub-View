import DefaultLoader from '../../../../../../ui/Loaders/DefaultLoader';
import type { FinishedCase } from '../../../../types';
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
                        ) : data.length === 0 ? (
                            <tr className={styles.emptyDataRow}>
                                <td colSpan={11}>
                                    <span>Данных не найдено</span>
                                </td>
                            </tr>
                        ) : (
                            data.map(item => (
                                <tr onClick={() => fetchCases(item.zSlUid)}>
                                    <td>{item.positionNumber}</td>
                                    <td>{item.recordNumber}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.name}</td>
                                    <td>{item.patronymic}</td>
                                    <td>{item.uslOk}</td>
                                    <td>{item.sPolis}</td>
                                    <td>{item.nPolis}</td>
                                    <td>{item.sumv}</td>
                                    <td>{item.sump}</td>
                                    <td>{item.smoSump}</td>
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