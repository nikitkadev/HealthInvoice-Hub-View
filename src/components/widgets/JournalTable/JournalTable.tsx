import styles from './styles.module.scss';

const JournalTable = () => {
    return (
        <div className={styles.journalTableRoot}>
            <div className={styles.recordCount}>
                <p>Показано: 100</p>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <colgroup>
                        <col style={{ width: '2.5rem' }} />
                        <col style={{ width: '8rem' }} />
                        <col style={{ width: '12rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '5rem' }} />
                        <col style={{ width: '8rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '7rem' }} />
                        <col style={{ width: '7rem' }} />
                        <col style={{ width: '8rem' }} />
                    </colgroup>
                    <thead className={styles.journa_table_head}>
                        <tr className={styles.tr}>
                            <th>№</th>
                            <th>Дата загрузки</th>
                            <th>Загрузил</th>
                            <th>Имя файла</th>
                            <th>Код МО</th>
                            <th>Номер счета</th>
                            <th>Дата выставления</th>
                            <th>Обработано</th>
                            <th>Ошибочных</th>
                            <th>Статус МЭК</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.tr}>
                            <th>№</th>
                            <th>Дата загрузки</th>
                            <th>Загрузил</th>
                            <th>Имя файла</th>
                            <th>Код МО</th>
                            <th>Номер счета</th>
                            <th>Дата выставления</th>
                            <th>Обработано</th>
                            <th>Ошибочных</th>
                            <th>Статус МЭК</th>
                        </tr>
                        <tr className={styles.tr}>
                            <th>№</th>
                            <th>Дата загрузки</th>
                            <th>Загрузил</th>
                            <th>Имя файла</th>
                            <th>Код МО</th>
                            <th>Номер счета</th>
                            <th>Дата выставления</th>
                            <th>Обработано</th>
                            <th>Ошибочных</th>
                            <th>Статус МЭК</th>
                        </tr>
                        <tr className={styles.tr}>
                            <th>№</th>
                            <th>Дата загрузки</th>
                            <th>Загрузил</th>
                            <th>Имя файла</th>
                            <th>Код МО</th>
                            <th>Номер счета</th>
                            <th>Дата выставления</th>
                            <th>Обработано</th>
                            <th>Ошибочных</th>
                            <th>Статус МЭК</th>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <p>Показано: 100</p>
            </div>
        </div>
    )
};

export default JournalTable;