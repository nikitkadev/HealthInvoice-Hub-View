
import styles from './styles.module.scss';


const CasesTable = () => {

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

                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CasesTable;