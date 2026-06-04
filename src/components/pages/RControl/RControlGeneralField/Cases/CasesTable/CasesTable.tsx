
import type { Case } from '../../../types';

import DefaultLoader from '../../../../../ui/Loaders/DefaultLoader';

import styles from './styles.module.scss';
import dayjs from 'dayjs';

interface CasesTableProps {
    isLoading: boolean;
    data: Case[];
};

const CasesTable = ({
    data,
    isLoading }: CasesTableProps) => {
    return (
        <div className={styles.casesTableRoot}>
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
                                <tr>
                                    <td>{item.profil}</td>
                                    <td>{item.det}</td>
                                    <td>{item.prvs}</td>
                                    <td>{dayjs(item.startingAt).format('DD.MM.YYYY')}</td>
                                    <td>{dayjs(item.endingAt).format('DD.MM.YYYY')}</td>
                                    <td>{item.ds1}</td>
                                    <td>{item.edCol}</td>
                                    <td>{item.tarif}</td>
                                    <td>{item.sumM}</td>
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

export default CasesTable;