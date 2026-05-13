import { Separator } from '../../../../../shared/ui/seporator/Separator';
import styles from '../patient/Patient.module.css';

export const SummaryCases = () => {
    return (
        <div className={styles.container}>
            <div className={styles.patient_container}>
                <span>Законченный случай</span>
                <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />
                <div className={styles.patient_card}>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Лечебно-профилактическое учереждение</label>
                            <p>190001: ГБУЗ РХ "РКБ ИМЕНИ Г.Я.РЕМИШЕВСКОЙ"</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Направившая МО</label>
                            <p>190001: ГБУЗ РХ "РКБ ИМЕНИ Г.Я.РЕМИШЕВСКОЙ"</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Дата направления</label>
                            <p>07.04.2026</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Условие оказания медицинской помощи</label>
                            <p>3: Поликлиника</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Вид медицинской помощи</label>
                            <p>13: первичная специализированная медико-санитарная помощь</p>
                        </div>
                    </div>
                    <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Способ оплаты</label>
                            <p>79: Посещение с целью проведения отдельных услуг</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Лечение с</label>
                            <p>07.04.2026</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Лечение по</label>
                            <p>07.04.2026</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Койко-/пациенто дни</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Признак внутрибольничного перевода</label>
                            <p>-</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Признак отказа (дисп / мед)</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Признак мобильной бригады</label>
                            <p>-</p>
                        </div>
                    </div>
                    <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Форма медицинской помощи</label>
                            <p>3: Плановая</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Результат</label>
                            <p>301: Лечение завершено</p>
                        </div>

                    </div>
                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Результат (дисп / мед)</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Исход</label>
                            <p>304: Без перемен</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.smo_container}>
                <span>Случай</span>
                <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />
                <div className={styles.smo_card}>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Профиль</label>
                            <p>78: рентгенологии</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Специальность</label>
                            <p>60: Рентгенология</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Подразделение</label>
                            <p>19202606100010002</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Отделение</label>
                            <p>-</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Признак "детский"</label>
                            <p>0</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Цель посещения</label>
                            <p>2.6: Посещение по другим обстоятельствам</p>
                        </div>
                    </div>

                    <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Профиль койки</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Номер истории</label>
                            <p>190101097554559</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Поступление / перевод</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Признак реабилитации</label>
                            <p>-</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Лечение с</label>
                            <p>07.04.2026</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Лечение по</label>
                            <p>07.04.2026</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Количество</label>
                            <p>1,00</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Койко-/пациенто дни</label>
                            <p>07.04.2026</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Уровень ЛПУ</label>
                            <p>-</p>
                        </div>
                    </div>

                    <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>МКБ первичный</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>МКБ основной</label>
                            <p>C92.0: Острый миелоидный лейкоз</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>МКБ сопутствующее</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>МКБ осложнений</label>
                            <p>-</p>
                        </div>
                    </div>

                    <Separator type="line" orientation="horizontal" size="xs" color="#e2e2e2" />

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Подозрение на ЗНО</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Идентификатор доктора</label>
                            <p>129-314-730 53</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Масса тела (кг)</label>
                            <p>-</p>
                        </div>
                        <div className={styles.info_block}>
                            <label>Характер основного заболевания</label>
                            <p>3: Ранее установленное хроническое</p>
                        </div>
                    </div>

                    <div className={styles.line}>
                        <div className={styles.info_block}>
                            <label>Комментарий</label>
                            <p>-</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SummaryCases;