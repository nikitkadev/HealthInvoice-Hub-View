import styles from "./Patient.module.css";

export const Patient = () => {
    return (
        <div className={styles.container}>
            <div className={styles.patient_container}>
                <span>Пациент</span>
                <div className={styles.patient_card}>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>ФИО</label>
                            <p>Иванов Иван Иванович</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>День рождения</label>
                            <p>01.01.1970</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Пол</label>
                            <p>Мужской</p>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Документ</label>
                            <p>Паспорт</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Выдан</label>
                            <p>ОВД г. Москвы</p>
                        </div>

                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Серия</label>
                            <p>1234</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Номер</label>
                            <p>567890</p>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Статус</label>
                            <p>Активен</p>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>ФИО представителя</label>
                            <p>Иванов Иван Иванович</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>День рождения представителя</label>
                            <p>01.01.1970</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Пол представителя</label>
                            <p>Мужской</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.smo_container}>
                <span>СМО</span>
                <div className={styles.smo_card}>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Код</label>
                            <p>19001: АОСП ООО "СК "ИНГОССТРАХ-М"- ФИЛИАЛ В Г. АБАКАН</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Наименование</label>
                            <p>-</p>
                        </div>

                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>ОГРН</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>ОКАТО</label>
                            <p>-</p>
                        </div>

                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Серия полиса</label>
                            <p>123123123</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Номер полиса</label>
                            <p>1956120888000054</p>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>ЕНП</label>
                            <p>1956120888000054</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Тип</label>
                            <p>3</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Patient;